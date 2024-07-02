package com.lactobloom.controller;

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

    @PostMapping("/save")
    public ResponseEntity<Wishlist> saveWishlist(@RequestBody Wishlist wishlist) {
        return new ResponseEntity<>(wishlistService.saveWishlist(wishlist), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<Wishlist> getAllWishlists() {
        return wishlistService.getAllWishlists();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Wishlist> getWishlistById(@PathVariable int id) {
        return new ResponseEntity<>(wishlistService.getWishlistById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Wishlist> updateWishlist(@PathVariable int id, @RequestBody Wishlist wishlist) {
        return new ResponseEntity<>(wishlistService.updateWishlist(wishlist, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteWishlist(@PathVariable int id) {
        wishlistService.deleteWishlist(id);
        return new ResponseEntity<>("Wishlist deleted successfully!", HttpStatus.OK);
    }
}
