package com.lactobloom.service.interfaces;

import com.lactobloom.dto.BrandDto;

import java.util.List;

public interface IBrandService {
    BrandDto saveBrand(BrandDto brandDto);
    List<BrandDto> getAllBrands();
    BrandDto getBrandById(int id);
    BrandDto updateBrand(BrandDto brandDto, int id);
    void deleteBrand(int id);
    BrandDto findBrandByProductId(int id);
}
