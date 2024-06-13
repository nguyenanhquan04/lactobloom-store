package com.lactobloom.controller;

import com.lactobloom.dto.ReviewDto;
import com.lactobloom.model.Review;
import com.lactobloom.service.interfaces.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private IReviewService reviewService;

    @PostMapping("/save/user/{userId}/product/{productId}")
    public ResponseEntity<ReviewDto> saveReview(@RequestBody ReviewDto reviewDto, @PathVariable int userId, @PathVariable int productId) {
        return new ResponseEntity<>(reviewService.saveReview(reviewDto, userId, productId), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<ReviewDto> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable int id) {
        return new ResponseEntity<>(reviewService.getReviewById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}/user/{userId}/product/{productId}")
    public ResponseEntity<ReviewDto> updateReview(@PathVariable int id, @PathVariable int userId, @PathVariable int productId, @RequestBody ReviewDto reviewDto) {
        return new ResponseEntity<>(reviewService.updateReview(reviewDto, id, userId, productId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable int id) {
        reviewService.deleteReview(id);
        return new ResponseEntity<>("Review deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/product/{productId}")
    public List<ReviewDto> getReviewsByProductId(@PathVariable int productId) {
        return reviewService.getReviewsByProductId(productId);
    }
}
