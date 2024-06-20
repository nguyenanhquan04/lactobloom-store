package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ResetPasswordDto;
import com.lactobloom.dto.UserDto;

import java.util.List;

public interface IUserService {
    List<UserDto> getAllUsers();
    UserDto getUserInfo();
    UserDto getUserById(int id);
    UserDto updateUserInfo (UserDto userDto);
    boolean resetPassword(ResetPasswordDto resetPasswordDto);
    UserDto updateUser(UserDto userDto, int id);
    void deleteUser(int id);
    List<UserDto> searchUsersByFullName(String fullName);
    UserDto findByEmail(String email);
}
