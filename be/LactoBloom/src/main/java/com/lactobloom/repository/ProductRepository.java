package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>{
    List<Product> findByProductNameContaining(String productName);
    List<Product> findByCategoryCategoryId(int categoryId);
    List<Product> findByBrandBrandId(int brandId);
}