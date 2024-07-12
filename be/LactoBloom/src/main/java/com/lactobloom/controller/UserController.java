package com.lactobloom.controller;

import com.lactobloom.dto.ChangePasswordDto;
import com.lactobloom.dto.UserDto;
import com.lactobloom.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/members")
    public List<UserDto> getMembers() {
        return userService.getMembers();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/staffs")
    public List<UserDto> getStaffs() {
        return userService.getStaffs();
    }

    @GetMapping("/info")
    public ResponseEntity<UserDto> getUserInfo() {
        return new ResponseEntity<>(userService.getUserInfo(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable int id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/updateInfo")
    public ResponseEntity<UserDto> updateUserInfo(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.updateUserInfo(userDto), HttpStatus.OK);
    }

    @PutMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody ChangePasswordDto.ResetPasswordRequest resetPasswordRequest) {
        if(userService.resetPassword(resetPasswordRequest))
            return new ResponseEntity<>("Password reset successfully!", HttpStatus.OK);
        return new ResponseEntity<>("Failed to reset password!", HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable int id, @RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.updateUser(userDto, id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return new ResponseEntity<>("User deleted successfully!", HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/search")
    public List<UserDto> searchUsersByFullName(@RequestParam String fullName) {
        return userService.searchUsersByFullName(fullName);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/findByEmail")
    public UserDto searchUsersByEmail(@RequestParam String email) {
        return userService.findByEmail(email);
    }
}
