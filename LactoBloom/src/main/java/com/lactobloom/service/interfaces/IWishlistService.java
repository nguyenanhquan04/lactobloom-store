package com.lactobloom.service.interfaces;

import com.lactobloom.dto.WishlistDto;
import com.lactobloom.model.Wishlist;

import java.util.List;

public interface IWishlistService {
    WishlistDto saveWishlist(WishlistDto wishlistDto, int userId, int productId);
    List<WishlistDto> getAllWishlists();
    WishlistDto getWishlistById(int id);
    WishlistDto updateWishlist(WishlistDto wishlistDto, int id, int userId, int productId);
    void deleteWishlist(int id);
    List<WishlistDto> getWishlistsByUserId(int userId);
}
