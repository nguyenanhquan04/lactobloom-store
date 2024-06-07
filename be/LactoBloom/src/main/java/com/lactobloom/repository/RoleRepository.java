package com.lactobloom.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByName(String roleName);
}