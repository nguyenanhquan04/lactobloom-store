package com.lactobloom.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.BlogReview;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface BlogReviewRepository extends JpaRepository<BlogReview, Integer> {
    List<BlogReview> findByBlog_BlogId(int productId);
    @Modifying
    @Transactional
    void deleteByUser_UserId(int id);
}
