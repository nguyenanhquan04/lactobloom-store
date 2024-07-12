package com.lactobloom.repository;

import com.lactobloom.model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Integer> {
    Optional<Otp> findByUserUserId(int userId);
    Optional<Otp> findByOtpAndUserUserId(int otp, Integer userId);
}
