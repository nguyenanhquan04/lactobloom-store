package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>{
    List<Product> findByProductNameContainingIgnoreCase(String productName);
    List<Product> findByProductNameContainingIgnoreCaseAndCategoryCategoryId(String productName, Integer categoryId);
    List<Product> findByProductNameContainingIgnoreCaseAndBrandBrandId(String productName, Integer brandId);
    List<Product> findByProductNameContainingIgnoreCaseAndCategoryCategoryIdAndBrandBrandId(String productName, Integer categoryId, Integer brandId);
    List<Product> findByCategoryCategoryId(int categoryId);
    List<Product> findByBrandBrandId(int brandId);
}