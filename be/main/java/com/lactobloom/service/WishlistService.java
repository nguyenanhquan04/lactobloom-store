package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Wishlist;
import com.lactobloom.repository.WishlistRepository;
import com.lactobloom.service.interfaces.IWishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService implements IWishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Override
    public Wishlist saveWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    @Override
    public List<Wishlist> getAllWishlists() {
        return wishlistRepository.findAll();
    }

    @Override
    public Wishlist getWishlistById(int id) {
        return wishlistRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Wishlist", "Id", id));
    }

    @Override
    public Wishlist updateWishlist(Wishlist wishlist, int id) {
        Wishlist existingWishlist = wishlistRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Wishlist", "Id", id));

        existingWishlist.setUser(wishlist.getUser());
        existingWishlist.setProduct(wishlist.getProduct());

        return wishlistRepository.save(existingWishlist);
    }

    @Override
    public void deleteWishlist(int id) {
        wishlistRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Wishlist", "Id", id));
        wishlistRepository.deleteById(id);
    }
}
