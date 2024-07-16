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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        User existingUser = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        existingUser.setOtp(null);
        userRepository.save(existingUser);
        otpRepository.findByUserUserId(existingUser.getUserId()).ifPresent(otpRepository::delete);
        int newOtp = otpGenerator();
        String otpMessage = String.format("Thank you for using our service. To complete your request, please use the following OTP: %d", newOtp);
        MailDto mailDto = MailDto.builder()
                .to(email)
                .text(otpMessage)
                .subject("Verification OTP")
                .build();
        Otp otp = Otp.builder()
                .otp(newOtp)
                .expirationTime(new Date(System.currentTimeMillis() + 60 * 5 * 1000))
                .user(existingUser)
                .build();
        emailService.sendSimpleMessage(mailDto);
        otpRepository.save(otp);
        return "Email sent for verification";
    }

    public ResponseEntity<String> changePassword(String email, int otp, ChangePasswordDto.ChangePasswordRequest changePasswordRequest){
        User existingUser = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        Otp existingOtp = otpRepository.findByOtpAndUserUserId(otp, existingUser.getUserId()).orElseThrow(() ->
                new ResourceNotFoundException("OTP", "OTP", otp));
        if(!Objects.equals(changePasswordRequest.getPassword(), changePasswordRequest.getRepeatPassword()))
            return new ResponseEntity<>("Repeat password is not the same!", HttpStatus.EXPECTATION_FAILED);
        if(existingOtp.getExpirationTime().before(Date.from(Instant.now()))) {
            existingUser.setOtp(null);
            userRepository.save(existingUser);
            otpRepository.deleteById(existingOtp.getOtpId());
            return new ResponseEntity<>("OTP has expired!", HttpStatus.EXPECTATION_FAILED);
        }
        existingUser.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
        userRepository.save(existingUser);
        existingUser.setOtp(null);
        userRepository.save(existingUser);
        otpRepository.deleteById(existingOtp.getOtpId());
        return new ResponseEntity<>("Password has been updated!", HttpStatus.OK);
    }

    public int otpGenerator(){
        Random random = new Random();
        return random.nextInt(100000,999999);
    }
}
