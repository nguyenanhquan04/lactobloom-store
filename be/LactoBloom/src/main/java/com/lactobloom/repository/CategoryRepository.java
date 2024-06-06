package com.lactobloom.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Category;



public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
