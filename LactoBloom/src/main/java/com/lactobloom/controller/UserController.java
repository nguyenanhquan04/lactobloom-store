package com.lactobloom.controller;

import com.lactobloom.dto.RegisterRequest;
import com.lactobloom.dto.AuthenticationResponse;
import com.lactobloom.model.User;
import com.lactobloom.service.interfaces.IUserService;
import com.lactobloom.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private IUserService userService;

//    @PostMapping("/logout")
//    public ResponseEntity<?> logout() {
//        // Invalidate JWT token or handle logout logic
//        return ResponseEntity.ok().build();
//    }
//
//    @GetMapping("/me")
//    public ResponseEntity<User> getCurrentUser(@RequestParam String email) {
//        User user = userService.findByEmail(email);
//        return ResponseEntity.ok(user);
//    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
        return new ResponseEntity<>(userService.updateUser(user, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return new ResponseEntity<>("User deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<User> searchUsersByFullName(@RequestParam String fullName) {
        return userService.searchUsersByFullName(fullName);
    }

    @GetMapping("/findByEmail")
    public User searchUsersByEmail(@RequestParam String email) {
        return userService.findByEmail(email);
    }
}
