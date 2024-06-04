package com.lactobloom.service.interfaces;

import com.lactobloom.model.Product;

import java.util.List;

public interface IProductService {
    Product saveProduct(Product product);
    List<Product> getAllProducts();
    Product getProductById(int id);
    Product updateProduct(Product product, int id);
    void deleteProduct(int id);
    List<Product> searchProductsByName(String productName);
}
