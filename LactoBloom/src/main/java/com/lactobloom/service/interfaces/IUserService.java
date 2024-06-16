package com.lactobloom.service.interfaces;

import com.lactobloom.model.User;

import java.util.List;

public interface IUserService {
    User saveUser(User user);
    List<User> getAllUsers();
    User getUserById(int id);
    User updateUser(User user, int id);
    void deleteUser(int id);
    List<User> searchUsersByFullName(String fullName);
    User findByEmail(String email);
}
