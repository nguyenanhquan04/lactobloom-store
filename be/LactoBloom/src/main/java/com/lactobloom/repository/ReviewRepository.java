package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

}
