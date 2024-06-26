package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ChangePasswordDto;

public interface IOtpService {
    String verifyEmail(String email);
    boolean verifyOtp(String email, int otp);
    boolean changePassword(String email, ChangePasswordDto changePasswordDto);
}
