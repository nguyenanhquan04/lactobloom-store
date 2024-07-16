package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    List<Product> findByDeletedFalse();
    Optional<Product> findByProductIdAndDeletedFalse(int id);
    List<Product> findByProductNameContainingIgnoreCaseAndDeletedFalse(String productName);
    List<Product> findByProductNameContainingIgnoreCaseAndCategoryCategoryIdAndDeletedFalse(String productName, Integer categoryId);
    List<Product> findByProductNameContainingIgnoreCaseAndBrandBrandIdAndDeletedFalse(String productName, Integer brandId);
    List<Product> findByProductNameContainingIgnoreCaseAndCategoryCategoryIdAndBrandBrandIdAndDeletedFalse(String productName, Integer categoryId, Integer brandId);
    List<Product> findByCategoryCategoryIdAndDeletedFalse(int categoryId);
    List<Product> findByBrandBrandIdAndDeletedFalse(int brandId);
}