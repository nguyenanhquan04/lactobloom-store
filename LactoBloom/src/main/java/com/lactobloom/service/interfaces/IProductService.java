package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ProductDto;

import java.util.List;

public interface IProductService {
    ProductDto.ProductResponse saveProduct(int brandId, int categoryId, ProductDto.ProductRequest productRequest);
    List<ProductDto.ProductResponse> getAllProducts();
    ProductDto.ProductResponse getProductById(int id);
    List<ProductDto.ProductResponse> getUserWishlist();
    ProductDto.ProductResponse updateProduct(int id, int brandId, int cateoryId, ProductDto.ProductRequest productRequest);
    void deleteProduct(int id);
    List<ProductDto.ProductResponse> searchProducts(String productName, Integer categoryId, Integer brandId);
    List<ProductDto.ProductResponse> getProductsByCategoryId(int categoryId);
    List<ProductDto.ProductResponse> getProductsByBrandId(int brandId);
}
