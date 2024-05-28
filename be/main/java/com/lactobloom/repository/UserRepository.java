package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.User;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByFullNameContaining(String substring);
}
