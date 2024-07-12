package com.lactobloom.service.interfaces;

import com.lactobloom.dto.BlogReviewDto;

import java.util.List;

public interface IBlogReviewService {
    BlogReviewDto saveReview(BlogReviewDto blogReviewDto, int blogId);
    List<BlogReviewDto> getAllReviews();
    BlogReviewDto getReviewById(int id);
    BlogReviewDto updateReview(BlogReviewDto blogReviewDto, int id);
    void deleteReview(int id);
    void deleteMyReview(int id);
    List<BlogReviewDto> getReviewsByBlogId(int productId);
}
