package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ReviewDto;
import com.lactobloom.model.Review;

import java.util.List;

public interface IReviewService {
    ReviewDto saveReview(ReviewDto reviewDto, int userId, int productId);
    List<ReviewDto> getAllReviews();
    ReviewDto getReviewById(int id);
    ReviewDto updateReview(ReviewDto reviewDto, int id, int userId, int productId);
    void deleteReview(int id);
    List<ReviewDto> getReviewsByProductId(int productId);
}
