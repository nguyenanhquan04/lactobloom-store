package com.lactobloom.service.interfaces;

import com.lactobloom.model.Brand;

import java.util.List;

public interface IBrandService {
    Brand saveBrand(Brand brand);
    List<Brand> getAllBrands();
    Brand getBrandById(int id);
    Brand updateBrand(Brand brand, int id);
    void deleteBrand(int id);
}
