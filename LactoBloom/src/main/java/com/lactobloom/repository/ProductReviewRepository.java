package com.lactobloom.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.ProductReview;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {
    List<ProductReview> findByProduct_ProductId(int productId);
    @Modifying
    @Transactional
    void deleteByUser_UserId(int id);
}
