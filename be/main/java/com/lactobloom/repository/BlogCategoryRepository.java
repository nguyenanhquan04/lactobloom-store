package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.BlogCategory;

public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Integer> {

}
