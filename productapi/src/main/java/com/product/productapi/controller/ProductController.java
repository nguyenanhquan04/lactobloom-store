package com.product.productapi.controller;

import java.util.List;

import com.product.productapi.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.product.productapi.repo.ProductRepo;






@RestController
public class ProductController {
    @Autowired
    private ProductRepo productRepo;

    @GetMapping(value = "/product")
    public List<Product> getProducts() {
        return productRepo.findAll();
    }

}
