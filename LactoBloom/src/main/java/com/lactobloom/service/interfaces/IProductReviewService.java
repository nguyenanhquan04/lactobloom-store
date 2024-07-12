package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ProductReviewDto;

import java.util.List;

public interface IProductReviewService {
    ProductReviewDto saveReview(ProductReviewDto productReviewDto, int productId);
    List<ProductReviewDto> getAllReviews();
    ProductReviewDto getReviewById(int id);
    ProductReviewDto updateReview(ProductReviewDto productReviewDto, int id);
    void deleteReview(int id);
    void deleteMyReview(int id);
    List<ProductReviewDto> getReviewsByProductId(int productId);
}
