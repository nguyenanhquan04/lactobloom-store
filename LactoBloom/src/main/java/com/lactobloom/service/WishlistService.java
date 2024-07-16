package com.lactobloom.service;

import com.lactobloom.dto.WishlistDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Product;
import com.lactobloom.model.User;
import com.lactobloom.model.Wishlist;
import com.lactobloom.repository.ProductRepository;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.repository.WishlistRepository;
import com.lactobloom.service.interfaces.IWishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService implements IWishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public WishlistDto saveWishlist(int productId) {
        Wishlist wishlist = new Wishlist();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        Product product = productRepository.findById(productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        Wishlist existingWishlist = wishlistRepository.findByUser_UserIdAndProduct_ProductId(user.getUserId(), productId);
        if(existingWishlist != null)
            return null;
        wishlist.setUser(user);
        wishlist.setProduct(product);
        Wishlist newWishList = wishlistRepository.save(wishlist);
        return mapToDto(newWishList);
    }

    @Override
    public List<WishlistDto> getAllWishlists() {
        return wishlistRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<WishlistDto> getMyWishlists() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        return wishlistRepository.findByUserUserId(user.getUserId()).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public WishlistDto getWishlistById(int id) {
        Wishlist wishlist = wishlistRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Wishlist", "Id", id));
        return mapToDto(wishlist);
    }

    @Override
    public void deleteWishlist(int id) {
        Wishlist wishlist = wishlistRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Wishlist", "Id", id));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if(user.getUserId() == wishlist.getUser().getUserId())
            wishlistRepository.deleteById(id);
    }

    @Override
    public void deleteUserWishlists() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        wishlistRepository.deleteByUser_UserId(user.getUserId());
    }

    private WishlistDto mapToDto (Wishlist wishlist){
        WishlistDto wishListResponse = new WishlistDto();
        wishListResponse.setWishlistId(wishlist.getWishlistId());
        wishListResponse.setProductId(wishlist.getProduct().getProductId());
        return wishListResponse;
    }
}
