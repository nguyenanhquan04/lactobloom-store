package com.lactobloom.service;

import com.lactobloom.dto.VoucherDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.User;
import com.lactobloom.model.Voucher;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.repository.VoucherRepository;
import com.lactobloom.service.interfaces.IVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherService implements IVoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public VoucherDto saveVoucher(VoucherDto voucherDto) {
        Voucher voucher = mapToEntity(voucherDto);
        Voucher newVoucher = voucherRepository.save(voucher);
        return mapToDto(newVoucher);
    }

    @Override
    public List<VoucherDto> getAllVouchers() {
        List<Voucher> voucherList = voucherRepository.findAll();
        return voucherList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public VoucherDto getVoucherById(int id) {
        Voucher voucher = voucherRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Voucher", "Id", id));
        return mapToDto(voucher);
    }

    @Override
    public VoucherDto updateVoucher(VoucherDto voucherDto, int id) {
        Voucher existingVoucher = voucherRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Voucher", "Id", id));
        existingVoucher.setPoint(voucherDto.getPoint());
        existingVoucher.setDiscount(voucherDto.getDiscount());
        existingVoucher.setExpirationDate(voucherDto.getExpirationDate());
        existingVoucher.setAvailable(voucherDto.isAvailable());
        return mapToDto(voucherRepository.save(existingVoucher));
    }

    @Override
    public void deleteVoucher(int id) {
        voucherRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Voucher", "Id", id));
        voucherRepository.deleteById(id);
    }

    private VoucherDto mapToDto (Voucher voucher){
        VoucherDto voucherResponse = new VoucherDto();
        voucherResponse.setVoucherId(voucher.getVoucherId());
        voucherResponse.setPoint(voucher.getPoint());
        voucherResponse.setDiscount(voucher.getDiscount());
        voucherResponse.setExpirationDate(voucher.getExpirationDate());
        voucherResponse.setAvailable(voucher.isAvailable());
        return voucherResponse;
    }

    private Voucher mapToEntity(VoucherDto voucherDto){
        Voucher voucher = new Voucher();
        voucher.setVoucherId(voucherDto.getVoucherId());
        voucher.setPoint(voucherDto.getPoint());
        voucher.setDiscount(voucherDto.getDiscount());
        voucher.setExpirationDate(voucherDto.getExpirationDate());
        voucher.setAvailable(voucherDto.isAvailable());
        return voucher;
    }
}
