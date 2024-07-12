package com.lactobloom.service.interfaces;

import com.lactobloom.dto.WishlistDto;

import java.util.List;

public interface IWishlistService {
    WishlistDto saveWishlist(int productId);
    List<WishlistDto> getAllWishlists();
    List<WishlistDto> getMyWishlists();
    WishlistDto getWishlistById(int id);
    void deleteWishlist(int id);
    void deleteUserWishlists();
}
