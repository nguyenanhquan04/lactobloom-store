package com.lactobloom.controller;

import com.lactobloom.dto.UserDto;
import com.lactobloom.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/all")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/info")
    public ResponseEntity<UserDto> getUserInfo() {
        return new ResponseEntity<>(userService.getUserInfo(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable int id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/updateInfo")
    public ResponseEntity<UserDto> updateUserInfo(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.updateUserInfo(userDto), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable int id, @RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.updateUser(userDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return new ResponseEntity<>("User deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<UserDto> searchUsersByFullName(@RequestParam String fullName) {
        return userService.searchUsersByFullName(fullName);
    }

    @GetMapping("/findByEmail")
    public UserDto searchUsersByEmail(@RequestParam String email) {
        return userService.findByEmail(email);
    }
}
