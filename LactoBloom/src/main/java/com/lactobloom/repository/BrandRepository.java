package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Brand;

import java.util.List;
import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
    Brand findByProductsProductId(int id);
    List<Brand> findByDeletedFalse();
    Optional<Brand> findByBrandIdAndDeletedFalse(int id);
}
