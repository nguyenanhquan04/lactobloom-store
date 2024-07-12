package com.lactobloom.controller;

import com.lactobloom.dto.ChangePasswordDto;
import com.lactobloom.service.interfaces.IOtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/otp")
public class OtpController {

    @Autowired
    private IOtpService otpService;

    @PostMapping("/verifyEmail/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email){
        return new ResponseEntity<>(otpService.verifyEmail(email), HttpStatus.OK);
    }

    @PostMapping("/changePassword/{email}/{otp}")
    public ResponseEntity<String> changePassword(@PathVariable String email, @PathVariable int otp, @RequestBody ChangePasswordDto.ChangePasswordRequest changePasswordRequest){
        return otpService.changePassword(email, otp, changePasswordRequest);
    }
}
