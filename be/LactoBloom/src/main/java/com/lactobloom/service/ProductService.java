package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Product;
import com.lactobloom.repository.ProductRepository;
import com.lactobloom.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(int id) {
        return productRepository.findById((long) id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
    }

    @Override
    public Product updateProduct(Product product, int id) {
        Product existingProduct = productRepository.findById((long) id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));

        existingProduct.setProductName(product.getProductName());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setDiscount(product.getDiscount());
        existingProduct.setQuantity(product.getQuantity());
        // Update other fields as needed
        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(int id) {
        productRepository.findById((long) id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        productRepository.deleteById((long) id);
    }

    @Override
    public List<Product> searchProductsByName(String productName) {
        return productRepository.findByProductNameContaining(productName);
    }
}
