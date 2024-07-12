package com.lactobloom.controller;

import com.lactobloom.dto.BrandDto;
import com.lactobloom.model.Brand;
import com.lactobloom.service.interfaces.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brand")
public class BrandController {

    @Autowired
    private IBrandService brandService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PostMapping("/save")
    public ResponseEntity<BrandDto> saveBrand(@RequestBody BrandDto brandDto) {
        return new ResponseEntity<>(brandService.saveBrand(brandDto), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<BrandDto> getAllBrands() {
        return brandService.getAllBrands();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/get/{id}")
    public ResponseEntity<BrandDto> getBrandById(@PathVariable int id) {
        return new ResponseEntity<>(brandService.getBrandById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PutMapping("/update/{id}")
    public ResponseEntity<BrandDto> updateBrand(@PathVariable int id, @RequestBody BrandDto brandDto) {
        return new ResponseEntity<>(brandService.updateBrand(brandDto, id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable int id) {
        brandService.deleteBrand(id);
        return new ResponseEntity<>("Brand deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/getByProductId/{id}")
    public ResponseEntity<BrandDto> getByProductId(@PathVariable int id) {
        return new ResponseEntity<>(brandService.findBrandByProductId(id), HttpStatus.OK);
    }
}
