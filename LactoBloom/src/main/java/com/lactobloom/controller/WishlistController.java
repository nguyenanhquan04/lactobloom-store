package com.lactobloom.controller;

import com.lactobloom.dto.WishlistDto;
import com.lactobloom.model.Wishlist;
import com.lactobloom.service.interfaces.IWishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private IWishlistService wishlistService;

    @PostMapping("/save/user/{userId}/product/{productId}")
    public ResponseEntity<WishlistDto> saveWishlist(@RequestBody WishlistDto wishlistDto, @PathVariable int userId, @PathVariable int productId) {
        return new ResponseEntity<>(wishlistService.saveWishlist(wishlistDto, userId, productId), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<WishlistDto> getAllWishlists() {
        return wishlistService.getAllWishlists();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<WishlistDto> getWishlistById(@PathVariable int id) {
        return new ResponseEntity<>(wishlistService.getWishlistById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}/user/{userId}/product/{productId}")
    public ResponseEntity<WishlistDto> updateWishlist(@PathVariable int id, @PathVariable int userId, @PathVariable int productId, @RequestBody WishlistDto wishlistDto) {
        return new ResponseEntity<>(wishlistService.updateWishlist(wishlistDto, id, userId, productId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteWishlist(@PathVariable int id) {
        wishlistService.deleteWishlist(id);
        return new ResponseEntity<>("Wishlist deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public List<WishlistDto> getWishlistsByUserId(@PathVariable int userId) {
        return wishlistService.getWishlistsByUserId(userId);
    }
}
