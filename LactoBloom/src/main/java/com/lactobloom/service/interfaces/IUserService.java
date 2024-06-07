package com.lactobloom.service.interfaces;

import com.lactobloom.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface IUserService {
    User saveUser(User user);
    List<User> getAllUsers();
    User getUserById(int id);
    User updateUser(User user, int id);
    void deleteUser(int id);
    List<User> searchUsersByFullName(String fullName);
    User findByEmail(String email);
    UserDetails loadUserByUsername(String email);
}
