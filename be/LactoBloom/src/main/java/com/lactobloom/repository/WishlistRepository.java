package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {

}
