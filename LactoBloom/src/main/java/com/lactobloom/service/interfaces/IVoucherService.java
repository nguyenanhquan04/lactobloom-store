package com.lactobloom.service.interfaces;

import com.lactobloom.dto.VoucherDto;

import java.util.List;

public interface IVoucherService {
    VoucherDto saveVoucher(VoucherDto voucherDto, int userId);
    List<VoucherDto> getAllVouchers();
    VoucherDto getVoucherById(int id);
    VoucherDto updateVoucher(VoucherDto voucherDto, int id, int userId);
    void deleteVoucher(int id);
}
