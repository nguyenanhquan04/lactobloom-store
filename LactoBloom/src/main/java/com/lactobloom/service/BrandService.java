package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Brand;
import com.lactobloom.repository.BrandRepository;
import com.lactobloom.service.interfaces.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService implements IBrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public Brand saveBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand getBrandById(int id) {
        return brandRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", id));
    }

    @Override
    public Brand updateBrand(Brand brand, int id) {
        Brand existingBrand = brandRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", id));

        existingBrand.setBrandName(brand.getBrandName());
        // Update other fields as needed
        return brandRepository.save(existingBrand);
    }

    @Override
    public void deleteBrand(int id) {
        brandRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", id));
        brandRepository.deleteById(id);
    }
}
