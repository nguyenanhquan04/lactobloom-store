package com.lactobloom.service;

import com.lactobloom.dto.ProductDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Brand;
import com.lactobloom.model.Category;
import com.lactobloom.model.Product;
import com.lactobloom.repository.BrandRepository;
import com.lactobloom.repository.CategoryRepository;
import com.lactobloom.repository.ProductRepository;
import com.lactobloom.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ProductDto saveProduct(int brandId, int categoryId, ProductDto productDto) {
        Product product = mapToEntity(productDto);
        Brand brand = brandRepository.findById(brandId).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", brandId));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Category", "Id", categoryId));
        product.setBrand(brand);
        product.setCategory(category);
        Product newProduct = productRepository.save(product);
        return mapToDto(newProduct);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> productList = productRepository.findAll();
        return productList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(int id) {
        Product product = productRepository.findById((long) id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        return mapToDto(product);
    }

    @Override
    public ProductDto updateProduct(int id, int brandId, int categoryId, ProductDto productDto) {
        Product existingProduct = productRepository.findById((long) id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        Brand brand = brandRepository.findById(brandId).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", brandId));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Category", "Id", categoryId));
        existingProduct.setProductName(productDto.getProductName());
        existingProduct.setBrand(brand);
        existingProduct.setCategory(category);
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setDiscount(productDto.getDiscount());
        existingProduct.setStock(productDto.getStock());
        return mapToDto(productRepository.save(existingProduct));
    }

    @Override
    public void deleteProduct(int id) {
        productRepository.findById((long) id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        productRepository.deleteById((long) id);
    }

    @Override
    public List<ProductDto> searchProductsByName(String productName) {
        List<Product> productList = productRepository.findByProductNameContaining(productName);
        return productList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getProductsByCategoryId(int categoryId) {
        return productRepository.findByCategoryCategoryId(categoryId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getProductsByBrandId(int brandId) {
        return productRepository.findByBrandBrandId(brandId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ProductDto mapToDto (Product product){
        ProductDto productResponse = new ProductDto();
        productResponse.setProductId(product.getProductId());
        productResponse.setProductName(product.getProductName());
        productResponse.setDescription(product.getDescription());
        productResponse.setPrice(product.getPrice());
        productResponse.setDiscount(product.getDiscount());
        productResponse.setStock(product.getStock());
        return productResponse;
    }

    private Product mapToEntity(ProductDto productDto){
        Product product = new Product();
        product.setProductName(productDto.getProductName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setDiscount(productDto.getDiscount());
        product.setStock(productDto.getStock());
        return product;
    }
}
