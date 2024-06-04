package com.lactobloom.service.interfaces;

import com.lactobloom.model.Review;

import java.util.List;

public interface IReviewService {
    Review saveReview(Review review);
    List<Review> getAllReviews();
    Review getReviewById(int id);
    Review updateReview(Review review, int id);
    void deleteReview(int id);
}
