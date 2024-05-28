package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {

}
