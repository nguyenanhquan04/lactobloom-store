package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Category findByProductsProductId(int id);
    List<Category> findByDeletedFalse();
    Optional<Category> findByCategoryIdAndDeletedFalse(int id);
}
