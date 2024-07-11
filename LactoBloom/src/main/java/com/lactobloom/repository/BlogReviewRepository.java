package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.BlogReview;

import java.util.List;

public interface BlogReviewRepository extends JpaRepository<BlogReview, Integer> {
    List<BlogReview> findByBlog_BlogId(int productId);
}
