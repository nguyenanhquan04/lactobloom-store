package com.lactobloom.controller;

import com.lactobloom.dto.VoucherDto;
import com.lactobloom.service.interfaces.IVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/voucher")
@CrossOrigin(origins = "*")
public class VoucherController {

    @Autowired
    private IVoucherService voucherService;

    @PostMapping("/save")
    public ResponseEntity<VoucherDto> saveVoucher(@RequestBody VoucherDto voucherDto) {
        return new ResponseEntity<>(voucherService.saveVoucher(voucherDto), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<VoucherDto> getAllVouchers() {
        return voucherService.getAllVouchers();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<VoucherDto> getVoucherById(@PathVariable int id) {
        return new ResponseEntity<>(voucherService.getVoucherById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VoucherDto> updateVoucher(@PathVariable int id, @RequestBody VoucherDto voucherDto) {
        return new ResponseEntity<>(voucherService.updateVoucher(voucherDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteVoucher(@PathVariable int id) {
        voucherService.deleteVoucher(id);
        return new ResponseEntity<>("Voucher deleted successfully!", HttpStatus.OK);
    }
}
