package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.BlogCategory;

import java.util.List;
import java.util.Optional;

public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Integer> {
    BlogCategory findByBlogsBlogId(int id);
    List<BlogCategory> findByDeletedFalse();
    Optional<BlogCategory> findByBlogCategoryIdAndDeletedFalse(int id);
}
