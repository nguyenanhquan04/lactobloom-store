package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Voucher;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {

}
