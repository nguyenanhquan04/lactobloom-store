package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ChangePasswordDto;
import org.springframework.http.ResponseEntity;

public interface IOtpService {
    String verifyEmail(String email);
    ResponseEntity<String> changePassword(String email, int otp, ChangePasswordDto.ChangePasswordRequest changePasswordRequest);
}
