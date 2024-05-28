package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer> {

}
