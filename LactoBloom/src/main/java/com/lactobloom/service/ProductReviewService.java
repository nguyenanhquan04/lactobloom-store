package com.lactobloom.service;

import com.lactobloom.dto.ProductReviewDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Product;
import com.lactobloom.model.ProductReview;
import com.lactobloom.model.User;
import com.lactobloom.repository.ProductRepository;
import com.lactobloom.repository.ProductReviewRepository;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.service.interfaces.IProductReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductReviewService implements IProductReviewService {

    @Autowired
    private ProductReviewRepository productReviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductReviewDto saveReview(ProductReviewDto productReviewDto, int productId) {
        ProductReview productReview = mapToEntity(productReviewDto);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        Product product = productRepository.findById(productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        productReview.setUser(user);
        productReview.setProduct(product);
        productReview.setReviewDate(productReviewDto.getReviewDate());
        ProductReview newReview = productReviewRepository.save(productReview);
        return mapToDto(newReview);
    }

    @Override
    public List<ProductReviewDto> getAllReviews() {
        List<ProductReview> reviewList = productReviewRepository.findAll();
        return reviewList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ProductReviewDto getReviewById(int id) {
        ProductReview review = productReviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        return mapToDto(review);
    }

    @Override
    public ProductReviewDto updateReview(ProductReviewDto productReviewDto, int id) {
        ProductReview existingReview = productReviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if( existingReview.getUser().getUserId() == user.getUserId()){
            existingReview.setRate(productReviewDto.getRate());
            existingReview.setComment(productReviewDto.getComment());
        }
        return mapToDto(productReviewRepository.save(existingReview));
    }

    @Override
    public void deleteReview(int id) {
        productReviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        productReviewRepository.deleteById(id);
    }

    @Override
    public void deleteMyReview(int id) {
        ProductReview productReview = productReviewRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review", "Id", id));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if(user.getUserId() == productReview.getUser().getUserId())
            productReviewRepository.deleteById(id);
    }

    @Override
    public List<ProductReviewDto> getReviewsByProductId(int productId) {
        return productReviewRepository.findByProduct_ProductId(productId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ProductReviewDto mapToDto (ProductReview productReview){
        ProductReviewDto reviewResponse = new ProductReviewDto();
        reviewResponse.setReviewId(productReview.getReviewId());
        reviewResponse.setEmail(productReview.getUser().getEmail());
        reviewResponse.setRate(productReview.getRate());
        reviewResponse.setComment(productReview.getComment());
        reviewResponse.setReviewDate(productReview.getReviewDate());
        return reviewResponse;
    }

    private ProductReview mapToEntity(ProductReviewDto productReviewDto){
        ProductReview review = new ProductReview();
        review.setRate(productReviewDto.getRate());
        review.setComment(productReviewDto.getComment());
        return review;
    }
}
