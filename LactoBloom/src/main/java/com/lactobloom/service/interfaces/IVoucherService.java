package com.lactobloom.service.interfaces;

import com.lactobloom.dto.VoucherDto;

import java.util.List;

public interface IVoucherService {
    VoucherDto saveVoucher(VoucherDto voucherDto);
    List<VoucherDto> getAvailableVouchers();
    List<VoucherDto> getUserVouchers();
    List<VoucherDto> getAllVouchers();
    VoucherDto getVoucherById(int id);
    VoucherDto updateVoucher(VoucherDto voucherDto, int id);
    boolean exchangeVoucher(int id);
    void deleteVoucher(int id);
}
