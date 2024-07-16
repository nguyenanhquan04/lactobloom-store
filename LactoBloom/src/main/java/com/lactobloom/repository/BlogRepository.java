package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Blog;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findByDeletedFalse();
    Optional<Blog> findByBlogIdAndDeletedFalse(int id);
    List<Blog> findByTitleContainingIgnoreCaseAndDeletedFalse(String title);
    List<Blog> findByBlogCategory_BlogCategoryIdAndDeletedFalse(int id);
}
