package com.product.productapi.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.productapi.model.Product;

public interface ProductRepo extends JpaRepository<Product, Integer>{

}
