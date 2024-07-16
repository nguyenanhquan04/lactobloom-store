package com.lactobloom.service;

import com.lactobloom.dto.BrandDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Brand;
import com.lactobloom.repository.BrandRepository;
import com.lactobloom.service.interfaces.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandService implements IBrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public BrandDto saveBrand(BrandDto brandDto) {
        Brand brand = mapToEntity(brandDto);
        return mapToDto(brandRepository.save(brand));
    }

    @Override
    public List<BrandDto> getAllBrands() {
        List<Brand> brandList = brandRepository.findByDeletedFalse();
        return brandList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BrandDto getBrandById(int id) {
        Brand brand = brandRepository.findByBrandIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", id));
        return mapToDto(brand);
    }

    @Override
    public BrandDto updateBrand(BrandDto brandDto, int id) {
        Brand existingBrand = brandRepository.findByBrandIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", id));
        existingBrand.setBrandName(brandDto.getBrandName());
        return mapToDto(brandRepository.save(existingBrand));
    }

    @Override
    public void deleteBrand(int id) {
        Brand brand = brandRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", id));
        brand.setDeleted(true);
        brandRepository.save(brand);
    }

    @Override
    public BrandDto findBrandByProductId(int id){
        return mapToDto(brandRepository.findByProductsProductId(id));
    }

    private BrandDto mapToDto (Brand brand){
        BrandDto brandResponse = new BrandDto();
        brandResponse.setBrandId(brand.getBrandId());
        brandResponse.setBrandName(brand.getBrandName());
        return brandResponse;
    }

    private Brand mapToEntity(BrandDto brandDto){
        Brand brand = new Brand();
        brand.setBrandName(brandDto.getBrandName());
        return brand;
    }
}
