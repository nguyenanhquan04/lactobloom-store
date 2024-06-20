package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Voucher;

import java.time.LocalDate;
import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    List<Voucher> findByUserIsNullAndAvailableTrue();
    List<Voucher> findByUserUserIdAndAvailableTrue(int userId);
    List<Voucher> findByExpirationDateBefore(LocalDate today);
}
