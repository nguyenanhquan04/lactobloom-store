package com.lactobloom.service;

import com.lactobloom.dto.BlogReviewDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Blog;
import com.lactobloom.model.BlogReview;
import com.lactobloom.model.User;
import com.lactobloom.repository.BlogRepository;
import com.lactobloom.repository.BlogReviewRepository;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.service.interfaces.IBlogReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogReviewService implements IBlogReviewService {

    @Autowired
    private BlogReviewRepository blogReviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public BlogReviewDto saveReview(BlogReviewDto blogReviewDto, int blogId) {
        BlogReview blogReview = mapToEntity(blogReviewDto);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        Blog blog = blogRepository.findByBlogIdAndDeletedFalse(blogId).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", blogId));
        blogReview.setUser(user);
        blogReview.setBlog(blog);
        blogReview.setReviewDate(blogReviewDto.getReviewDate());
        BlogReview newReview = blogReviewRepository.save(blogReview);
        return mapToDto(newReview);
    }

    @Override
    public List<BlogReviewDto> getAllReviews() {
        List<BlogReview> reviewList = blogReviewRepository.findAll();
        return reviewList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BlogReviewDto getReviewById(int id) {
        BlogReview review = blogReviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        return mapToDto(review);
    }

    @Override
    public BlogReviewDto updateReview(BlogReviewDto blogReviewDto, int id) {
        BlogReview existingReview = blogReviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if( existingReview.getUser() == user)
            existingReview.setComment(blogReviewDto.getComment());
        return mapToDto(blogReviewRepository.save(existingReview));
    }

    @Override
    public void deleteReview(int id) {
        blogReviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        blogReviewRepository.deleteById(id);
    }

    @Override
    public void deleteMyReview(int id) {
        BlogReview blogReview = blogReviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if(blogReview.getUser() == user)
            blogReviewRepository.deleteById(id);
    }

    @Override
    public List<BlogReviewDto> getReviewsByBlogId(int blogId) {
        return blogReviewRepository.findByBlog_BlogId(blogId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private BlogReviewDto mapToDto (BlogReview blogReview){
        BlogReviewDto reviewResponse = new BlogReviewDto();
        reviewResponse.setReviewId(blogReview.getReviewId());
        reviewResponse.setEmail(blogReview.getUser().getEmail());
        reviewResponse.setComment(blogReview.getComment());
        reviewResponse.setReviewDate(blogReview.getReviewDate());
        return reviewResponse;
    }

    private BlogReview mapToEntity(BlogReviewDto blogReviewDto){
        BlogReview review = new BlogReview();
        review.setComment(blogReviewDto.getComment());
        return review;
    }
}
