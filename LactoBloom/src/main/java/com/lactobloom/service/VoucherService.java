package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Voucher;
import com.lactobloom.repository.VoucherRepository;
import com.lactobloom.service.interfaces.IVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoucherService implements IVoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public Voucher saveVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    @Override
    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    @Override
    public Voucher getVoucherById(int id) {
        return voucherRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Voucher", "Id", id));
    }

    @Override
    public Voucher updateVoucher(Voucher voucher, int id) {
        Voucher existingVoucher = voucherRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Voucher", "Id", id));

        existingVoucher.setUser(voucher.getUser());
        existingVoucher.setDiscount(voucher.getDiscount());
        existingVoucher.setStartDate(voucher.getStartDate());
        existingVoucher.setExpirationDate(voucher.getExpirationDate());
        existingVoucher.setStatus(voucher.isStatus());

        return voucherRepository.save(existingVoucher);
    }

    @Override
    public void deleteVoucher(int id) {
        voucherRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Voucher", "Id", id));
        voucherRepository.deleteById(id);
    }
}
