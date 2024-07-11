package com.lactobloom.controller;

import com.lactobloom.dto.BlogReviewDto;
import com.lactobloom.service.interfaces.IBlogReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog-review")
public class BlogReviewController {

    @Autowired
    private IBlogReviewService blogReviewService;

    @PostMapping("/save/blog/{blogId}")
    public ResponseEntity<BlogReviewDto> saveReview(@RequestBody BlogReviewDto blogReviewDto, @PathVariable int blogId) {
        return new ResponseEntity<>(blogReviewService.saveReview(blogReviewDto, blogId), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/all")
    public List<BlogReviewDto> getAllReviews() {
        return blogReviewService.getAllReviews();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/get/{id}")
    public ResponseEntity<BlogReviewDto> getReviewById(@PathVariable int id) {
        return new ResponseEntity<>(blogReviewService.getReviewById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BlogReviewDto> updateReview(@PathVariable int id, @RequestBody BlogReviewDto blogReviewDto) {
        return new ResponseEntity<>(blogReviewService.updateReview(blogReviewDto, id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable int id) {
        blogReviewService.deleteReview(id);
        return new ResponseEntity<>("Review deleted successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/deleteMyReview/{id}")
    public ResponseEntity<String> deleteMyReview(@PathVariable int id) {
        blogReviewService.deleteMyReview(id);
        return new ResponseEntity<>("Review deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/blog/{blogId}")
    public List<BlogReviewDto> getReviewsByProductId(@PathVariable int blogId) {
        return blogReviewService.getReviewsByBlogId(blogId);
    }
}
