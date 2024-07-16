package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Voucher;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    List<Voucher> findByDeletedFalse();
    List<Voucher> findByUserUserId(int id);
    Optional<Voucher> findByVoucherIdAndDeletedFalse(int id);
    List<Voucher> findByUserIsNullAndAvailableTrueAndDeletedFalse();
    List<Voucher> findByUserUserIdAndAvailableTrue(int userId);
    List<Voucher> findByExpirationDateBefore(LocalDate today);
}
