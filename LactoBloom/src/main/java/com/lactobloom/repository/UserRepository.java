package com.lactobloom.repository;

import com.lactobloom.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.lactobloom.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByFullNameContainingAndDeletedFalse(String substring);
    List<User> findByDeletedFalse();
    Optional<User> findByUserIdAndDeletedFalse(int id);
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.deleted = false")
    List<User> findByRoleAndDeletedFalse(@Param("role") Role role);
    Optional<User> findByEmailAndDeletedFalse(String email);
}
