package com.lactobloom.controller;

import com.lactobloom.dto.WishlistDto;
import com.lactobloom.service.interfaces.IWishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private IWishlistService wishlistService;

    @PostMapping("/save/product/{productId}")
    public ResponseEntity<WishlistDto> saveWishlist(@PathVariable int productId) {
        return new ResponseEntity<>(wishlistService.saveWishlist(productId), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/all")
    public List<WishlistDto> getAllWishlists() {
        return wishlistService.getAllWishlists();
    }

    @GetMapping("/myWishlist")
    public List<WishlistDto> getMyWishlist() {
        return wishlistService.getMyWishlists();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/get/{id}")
    public ResponseEntity<WishlistDto> getWishlistById(@PathVariable int id) {
        return new ResponseEntity<>(wishlistService.getWishlistById(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteWishlist(@PathVariable int id) {
        wishlistService.deleteWishlist(id);
        return new ResponseEntity<>("Wishlist deleted successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/clearAll")
    public ResponseEntity<String> deleteMyWishlist() {
        wishlistService.deleteUserWishlists();
        return new ResponseEntity<>("User's Wishlists deleted successfully!", HttpStatus.OK);
    }
}
