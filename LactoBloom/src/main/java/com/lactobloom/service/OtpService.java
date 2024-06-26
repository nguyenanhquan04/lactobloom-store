package com.lactobloom.service;

import com.lactobloom.dto.ChangePasswordDto;
import com.lactobloom.dto.MailDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Otp;
import com.lactobloom.model.User;
import com.lactobloom.repository.OtpRepository;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.service.interfaces.IOtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService implements IOtpService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    public String verifyEmail(String email){
        User existingUser = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        int newOtp = otpGenerator();
        MailDto mailDto = MailDto.builder()
                .to(email)
                .text("This is the OTP for your request: " + newOtp)
                .subject("Verification OTP")
                .build();
        Otp otp = Otp.builder()
                .otp(newOtp)
                .expirationTime(new Date(System.currentTimeMillis() + 180 * 1000))
                .user(existingUser)
                .build();
        emailService.sendSimpleMessage(mailDto);
        otpRepository.save(otp);
        return "Email sent for verification";
    }

    public boolean verifyOtp(String email, int otp){
        User existingUser = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        Otp existingOtp = otpRepository.findByOtpAndUserUserId(otp, existingUser.getUserId()).orElseThrow(() ->
                new ResourceNotFoundException("Forgot Password request", "OTP", otp));
        if(existingOtp.getExpirationTime().before(Date.from(Instant.now()))){
            existingUser.setOtp(null);
            userRepository.save(existingUser);
            otpRepository.deleteById(existingOtp.getOtpId());
            return false;
        }
        return true;
    }

    public boolean changePassword(String email, ChangePasswordDto changePasswordDto){
        if(!Objects.equals(changePasswordDto.getPassword(), changePasswordDto.getRepeatPassword())){
            return false;
        }
        User existingUser = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        existingUser.setPassword(passwordEncoder.encode(changePasswordDto.getPassword()));
        userRepository.save(existingUser);
        return true;
    }

    public int otpGenerator(){
        Random random = new Random();
        return random.nextInt(100000,999999);
    }
}
