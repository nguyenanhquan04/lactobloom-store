package com.lactobloom.service;

import com.lactobloom.dto.ChangePasswordDto;
import com.lactobloom.dto.UserDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Role;
import com.lactobloom.model.User;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> getAllUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getMembers(){
        List<User> userList = userRepository.findByRole("MEMBER");
        return userList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getStaffs(){
        List<User> userList = userRepository.findByRole("STAFF");
        return userList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserInfo() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        return mapToDto(user);
    }

    @Override
    public UserDto getUserById(int id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("User", "Id", id));
        return mapToDto(user);
    }

    @Override
    public UserDto updateUserInfo(UserDto userDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User existingUser = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        existingUser.setFullName(userDto.getFullName());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setAddress(userDto.getAddress());
        existingUser.setPhone(userDto.getPhone());
        return mapToDto(userRepository.save(existingUser));
    }

    @Override
    public boolean resetPassword(ChangePasswordDto.ResetPasswordRequest resetPasswordRequest){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User existingUser = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if (passwordEncoder.matches(resetPasswordRequest.getPassword(), existingUser.getPassword())) {
            existingUser.setPassword(passwordEncoder.encode(resetPasswordRequest.getNewPassword()));
            userRepository.save(existingUser);
            return true;
        }
        return false;
    }

    @Override
    public UserDto updateUser(UserDto userDto, int id) {
        User existingUser = userRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("User", "Id", id));
        existingUser.setFullName(userDto.getFullName());
        existingUser.setRole(Role.valueOf(userDto.getRole()));
        existingUser.setEmail(userDto.getEmail());
        existingUser.setAddress(userDto.getAddress());
        existingUser.setPhone(userDto.getPhone());
        existingUser.setPoint(userDto.getPoint());
        return mapToDto(userRepository.save(existingUser));
    }

    @Override
    public void deleteUser(int id) {
        userRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("User", "Id", id));
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDto> searchUsersByFullName(String fullName) {
        return userRepository.findByFullNameContaining(fullName).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public UserDto findByEmail(String email) {
        User user= userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "Email", email));
        return mapToDto(user);
    }

    private UserDto mapToDto (User user){
        UserDto userResponse = new UserDto();
        userResponse.setUserId(user.getUserId());
        userResponse.setFullName(user.getFullName());
        userResponse.setRole(user.getRole().name());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhone(user.getPhone());
        userResponse.setAddress(user.getAddress());
        userResponse.setPoint(user.getPoint());
        return userResponse;
    }
}
