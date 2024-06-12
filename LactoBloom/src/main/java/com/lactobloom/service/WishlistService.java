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
    public WishlistDto saveWishlist(WishlistDto wishlistDto, int userId, int productId) {
        Wishlist wishlist = new Wishlist();
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User", "Id", userId));
        Product product = productRepository.findById((long) productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
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
    public WishlistDto getWishlistById(int id) {
        Wishlist wishlist = wishlistRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Wishlist", "Id", id));
        return mapToDto(wishlist);
    }

    @Override
    public WishlistDto updateWishlist(WishlistDto wishlistDto, int id, int userId, int productId) {
        Wishlist existingWishlist = wishlistRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Wishlist", "Id", id));
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User", "Id", userId));
        Product product = productRepository.findById((long) productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        existingWishlist.setUser(user);
        existingWishlist.setProduct(product);
        return mapToDto(wishlistRepository.save(existingWishlist));
    }

    @Override
    public void deleteWishlist(int id) {
        wishlistRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Wishlist", "Id", id));
        wishlistRepository.deleteById(id);
    }

    @Override
    public List<WishlistDto> getWishlistsByUserId(int userId) {
        return wishlistRepository.findByUserUserId(userId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private WishlistDto mapToDto (Wishlist wishlist){
        WishlistDto wishListResponse = new WishlistDto();
        wishListResponse.setWishlistId(wishlist.getWishlistId());
        return wishListResponse;
    }
}
