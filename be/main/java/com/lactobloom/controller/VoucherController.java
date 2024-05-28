package com.lactobloom.controller;

import com.lactobloom.model.Voucher;
import com.lactobloom.service.interfaces.IVoucherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vouchers")
public class VoucherController {

    private final IVoucherService voucherService;

    public VoucherController(IVoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @PostMapping("/save")
    public ResponseEntity<Voucher> saveVoucher(@RequestBody Voucher voucher) {
        return new ResponseEntity<>(voucherService.saveVoucher(voucher), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<Voucher> getAllVouchers() {
        return voucherService.getAllVouchers();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Voucher> getVoucherById(@PathVariable int id) {
        return new ResponseEntity<>(voucherService.getVoucherById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Voucher> updateVoucher(@PathVariable int id, @RequestBody Voucher voucher) {
        return new ResponseEntity<>(voucherService.updateVoucher(voucher, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteVoucher(@PathVariable int id) {
        voucherService.deleteVoucher(id);
        return new ResponseEntity<>("Voucher deleted successfully!", HttpStatus.OK);
    }
}
