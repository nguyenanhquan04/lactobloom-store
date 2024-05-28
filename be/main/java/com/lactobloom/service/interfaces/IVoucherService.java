package com.lactobloom.service.interfaces;

import com.lactobloom.model.Voucher;

import java.util.List;

public interface IVoucherService {
    Voucher saveVoucher(Voucher voucher);
    List<Voucher> getAllVouchers();
    Voucher getVoucherById(int id);
    Voucher updateVoucher(Voucher voucher, int id);
    void deleteVoucher(int id);
}
