package com.lactobloom.controller;

import com.lactobloom.dto.ChangePasswordDto;
import com.lactobloom.service.interfaces.IOtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins = "*")
public class OtpController {

    @Autowired
    private IOtpService otpService;

    @PostMapping("/verifyEmail/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email){
        return new ResponseEntity<>(otpService.verifyEmail(email), HttpStatus.OK);
    }

    @PostMapping("/verifyOtp/{email}/{otp}")
    public ResponseEntity<String> verifyOtp(@PathVariable String email, @PathVariable int otp){
        if(otpService.verifyOtp(email, otp))
            return new ResponseEntity<>("OTP verified!", HttpStatus.OK);
        else return new ResponseEntity<>("OTP has expired!", HttpStatus.EXPECTATION_FAILED);
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePassword(@PathVariable String email, @RequestBody ChangePasswordDto changePasswordDto){
        if(otpService.changePassword(email, changePasswordDto))
            return new ResponseEntity<>("Password has been updated!", HttpStatus.OK);
        else return new ResponseEntity<>("Repeat Password is not the same!", HttpStatus.EXPECTATION_FAILED);
    }
}
