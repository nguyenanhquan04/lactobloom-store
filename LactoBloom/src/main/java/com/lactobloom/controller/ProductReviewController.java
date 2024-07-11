package com.lactobloom.controller;

import com.lactobloom.dto.ProductReviewDto;
import com.lactobloom.service.interfaces.IProductReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-review")
public class ProductReviewController {

    @Autowired
    private IProductReviewService reviewService;

    @PostMapping("/save/product/{productId}")
    public ResponseEntity<ProductReviewDto> saveReview(@RequestBody ProductReviewDto productReviewDto, @PathVariable int productId) {
        return new ResponseEntity<>(reviewService.saveReview(productReviewDto, productId), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/all")
    public List<ProductReviewDto> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/get/{id}")
    public ResponseEntity<ProductReviewDto> getReviewById(@PathVariable int id) {
        return new ResponseEntity<>(reviewService.getReviewById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductReviewDto> updateReview(@PathVariable int id, @RequestBody ProductReviewDto productReviewDto) {
        return new ResponseEntity<>(reviewService.updateReview(productReviewDto, id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable int id) {
        reviewService.deleteReview(id);
        return new ResponseEntity<>("Review deleted successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/deleteMyReview/{id}")
    public ResponseEntity<String> deleteMyReview(@PathVariable int id) {
        reviewService.deleteMyReview(id);
        return new ResponseEntity<>("Review deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/product/{productId}")
    public List<ProductReviewDto> getReviewsByProductId(@PathVariable int productId) {
        return reviewService.getReviewsByProductId(productId);
    }
}
