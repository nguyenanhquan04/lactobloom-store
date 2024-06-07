package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Review;
import com.lactobloom.repository.ReviewRepository;
import com.lactobloom.service.interfaces.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService implements IReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review getReviewById(int id) {
        return reviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
    }

    @Override
    public Review updateReview(Review review, int id) {
        Review existingReview = reviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));

        existingReview.setUser(review.getUser());
        existingReview.setProduct(review.getProduct());
        existingReview.setRate(review.getRate());
        existingReview.setComment(review.getComment());
        existingReview.setReviewDate(review.getReviewDate());

        return reviewRepository.save(existingReview);
    }

    @Override
    public void deleteReview(int id) {
        reviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        reviewRepository.deleteById(id);
    }

    @Override
    public List<Review> getReviewsByProductId(int productId) {
        return reviewRepository.findByProduct_ProductId(productId);
    }
}
