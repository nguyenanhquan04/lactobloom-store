package com.lactobloom.service;

import com.lactobloom.dto.ReviewDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Product;
import com.lactobloom.model.Review;
import com.lactobloom.model.User;
import com.lactobloom.repository.ProductRepository;
import com.lactobloom.repository.ReviewRepository;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.service.interfaces.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService implements IReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ReviewDto saveReview(ReviewDto reviewDto, int productId) {
        Review review = mapToEntity(reviewDto);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        Product product = productRepository.findById((long) productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        review.setUser(user);
        review.setProduct(product);
        review.setReviewDate(LocalDateTime.now());
        Review newReview = reviewRepository.save(review);
        return mapToDto(newReview);
    }

    @Override
    public List<ReviewDto> getAllReviews() {
        List<Review> reviewList = reviewRepository.findAll();
        return reviewList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ReviewDto getReviewById(int id) {
        Review review = reviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        return mapToDto(review);
    }

    @Override
    public ReviewDto updateReview(ReviewDto reviewDto, int id, int productId) {
        Review existingReview = reviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        Product product = productRepository.findById((long) productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        existingReview.setProduct(product);
        existingReview.setRate(reviewDto.getRate());
        existingReview.setComment(reviewDto.getComment());
        existingReview.setReviewDate(LocalDateTime.now());
        return mapToDto(reviewRepository.save(existingReview));
    }

    @Override
    public void deleteReview(int id) {
        reviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        reviewRepository.deleteById(id);
    }

    @Override
    public List<ReviewDto> getReviewsByProductId(int productId) {
        return reviewRepository.findByProduct_ProductId(productId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ReviewDto mapToDto (Review review){
        ReviewDto reviewResponse = new ReviewDto();
        reviewResponse.setReviewId(review.getReviewId());
        reviewResponse.setRate(review.getRate());
        reviewResponse.setComment(review.getComment());
        reviewResponse.setReviewDate(review.getReviewDate());
        return reviewResponse;
    }

    private Review mapToEntity(ReviewDto reviewDto){
        Review review = new Review();
        review.setRate(reviewDto.getRate());
        review.setComment(reviewDto.getComment());
        return review;
    }
}
