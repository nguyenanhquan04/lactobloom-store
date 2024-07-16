package com.lactobloom.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Wishlist;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    List<Wishlist> findByUserUserId(int userId);
    Wishlist findByUser_UserIdAndProduct_ProductId(int userId, int productId);
    @Modifying
    @Transactional
    void deleteByUser_UserId(int userId);
    @Modifying
    @Transactional
    void deleteByProductProductId(int id);
}
