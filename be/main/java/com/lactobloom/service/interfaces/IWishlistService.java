package com.lactobloom.service.interfaces;

import com.lactobloom.model.Wishlist;

import java.util.List;

public interface IWishlistService {
    Wishlist saveWishlist(Wishlist wishlist);
    List<Wishlist> getAllWishlists();
    Wishlist getWishlistById(int id);
    Wishlist updateWishlist(Wishlist wishlist, int id);
    void deleteWishlist(int id);
}
