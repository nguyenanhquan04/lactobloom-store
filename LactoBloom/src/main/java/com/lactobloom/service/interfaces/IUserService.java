package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ChangePasswordDto;
import com.lactobloom.dto.UserDto;

import java.util.List;

public interface IUserService {
    List<UserDto> getAllUsers();
    List<UserDto> getMembers();
    List<UserDto> getStaffs();
    UserDto getUserById(int id);
    UserDto getUserInfo();
    UserDto updateUserInfo (UserDto userDto);
    boolean resetPassword(ChangePasswordDto.ResetPasswordRequest resetPasswordRequest);
    UserDto updateUser(UserDto userDto, int id);
    void deleteUser(int id);
    List<UserDto> searchUsersByFullName(String fullName);
    UserDto findByEmail(String email);
}
