package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
