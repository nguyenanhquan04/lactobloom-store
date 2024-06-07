package com.lactobloom.repository;

import com.lactobloom.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
