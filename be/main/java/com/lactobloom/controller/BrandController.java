package com.lactobloom.controller;

import com.lactobloom.model.Brand;
import com.lactobloom.service.interfaces.IBrandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brands")
public class BrandController {

    private final IBrandService brandService;

    public BrandController(IBrandService brandService) {
        this.brandService = brandService;
    }

    @PostMapping("/save")
    public ResponseEntity<Brand> saveBrand(@RequestBody Brand brand) {
        return new ResponseEntity<>(brandService.saveBrand(brand), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable int id) {
        return new ResponseEntity<>(brandService.getBrandById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable int id, @RequestBody Brand brand) {
        return new ResponseEntity<>(brandService.updateBrand(brand, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable int id) {
        brandService.deleteBrand(id);
        return new ResponseEntity<>("Brand deleted successfully!", HttpStatus.OK);
    }
}
