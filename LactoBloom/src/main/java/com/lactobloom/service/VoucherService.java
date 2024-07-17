package com.lactobloom.service;

import com.lactobloom.dto.VoucherDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.User;
import com.lactobloom.model.Voucher;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.repository.VoucherRepository;
import com.lactobloom.service.interfaces.IVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public List<VoucherDto> getAvailableVouchers(){
        List<Voucher> voucherList = voucherRepository.findByUserIsNullAndAvailableTrueAndDeletedFalse();
        return voucherList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<VoucherDto> getUserVouchers(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        List<Voucher> voucherList = voucherRepository.findByUserUserIdAndAvailableTrue(user.getUserId());
        return voucherList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<VoucherDto> getAllVouchers() {
        List<Voucher> voucherList = voucherRepository.findByDeletedFalse();
        return voucherList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public VoucherDto getVoucherById(int id) {
        Voucher voucher = voucherRepository.findByVoucherIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Voucher", "Id", id));
        return mapToDto(voucher);
    }

    @Override
    public VoucherDto updateVoucher(VoucherDto voucherDto, int id) {
        Voucher existingVoucher = voucherRepository.findByVoucherIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Voucher", "Id", id));
        if(existingVoucher.getUser() == null){
            existingVoucher.setPoint(voucherDto.getPoint());
            existingVoucher.setDiscount(voucherDto.getDiscount());
            existingVoucher.setExpirationDate(voucherDto.getExpirationDate());
            existingVoucher.setAvailable(voucherDto.isAvailable());
        }
        return mapToDto(voucherRepository.save(existingVoucher));
    }

    @Override
    public boolean exchangeVoucher(int id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if(email != null && !email.equals("anonymousUser")){
            User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                    new ResourceNotFoundException("User", "email", email));
            Voucher existingVoucher = voucherRepository.findByVoucherIdAndDeletedFalse(id).orElseThrow(() ->
                    new ResourceNotFoundException("Voucher", "Id", id));
            if(existingVoucher.getPoint() <= user.getPoint() && existingVoucher.getUser() == null && existingVoucher.isAvailable()){
                user.setPoint(user.getPoint() - existingVoucher.getPoint());
                User newUser = userRepository.save(user);
                existingVoucher.setUser(newUser);
                voucherRepository.save(existingVoucher);
                return true;
            }
        }
        return false;
    }

    @Override
    public void deleteVoucher(int id) {
        Voucher existingVoucher = voucherRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Voucher", "Id", id));
        existingVoucher.setDeleted(true);
        voucherRepository.save(existingVoucher);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void updateVoucherAvailability() {
        List<Voucher> expiredVouchers = voucherRepository.findByExpirationDateBefore(LocalDate.now());
        for (Voucher voucher : expiredVouchers){
            voucher.setAvailable(false);
        }
        voucherRepository.saveAll(expiredVouchers);
    }

    private VoucherDto mapToDto (Voucher voucher){
        VoucherDto voucherResponse = new VoucherDto();
        voucherResponse.setVoucherId(voucher.getVoucherId());
        voucherResponse.setPoint(voucher.getPoint());
        voucherResponse.setDiscount(voucher.getDiscount());
        voucherResponse.setOwner(voucher.getUser() != null ? voucher.getUser().getFullName() : null);
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
        voucher.setAvailable(true);
        return voucher;
    }
}
