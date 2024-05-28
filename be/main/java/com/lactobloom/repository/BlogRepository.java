package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Blog;

public interface BlogRepository extends JpaRepository<Blog, Integer> {

}
