package com.lactobloom.controller;

import com.lactobloom.dto.VoucherDto;
import com.lactobloom.service.interfaces.IVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/voucher")
public class VoucherController {

    @Autowired
    private IVoucherService voucherService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PostMapping("/save")
    public ResponseEntity<VoucherDto> saveVoucher(@RequestBody VoucherDto voucherDto) {
        return new ResponseEntity<>(voucherService.saveVoucher(voucherDto), HttpStatus.CREATED);
    }

    @GetMapping("/available")
    public List<VoucherDto> getAvailableVouchers() {
        return voucherService.getAvailableVouchers();
    }

    @GetMapping("/myVoucher")
    public List<VoucherDto> getUserVouchers() { return voucherService.getUserVouchers(); }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/all")
    public List<VoucherDto> getAllVouchers() {
        return voucherService.getAllVouchers();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/get/{id}")
    public ResponseEntity<VoucherDto> getVoucherById(@PathVariable int id) {
        return new ResponseEntity<>(voucherService.getVoucherById(id), HttpStatus.OK);
    }

    @PutMapping("/exchange/{id}")
    public ResponseEntity<String> exchangeVoucher(@PathVariable int id) {
        if(voucherService.exchangeVoucher(id))
            return new ResponseEntity<>("Exchanged voucher successfully!", HttpStatus.OK);
        return new ResponseEntity<>("Failed to exchange voucher!", HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PutMapping("/update/{id}")
    public ResponseEntity<VoucherDto> updateVoucher(@PathVariable int id, @RequestBody VoucherDto voucherDto) {
        return new ResponseEntity<>(voucherService.updateVoucher(voucherDto, id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteVoucher(@PathVariable int id) {
        voucherService.deleteVoucher(id);
        return new ResponseEntity<>("Voucher deleted successfully!", HttpStatus.OK);
    }
}
