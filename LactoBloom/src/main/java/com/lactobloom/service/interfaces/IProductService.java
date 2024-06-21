package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ProductRequest;
import com.lactobloom.dto.ProductResponse;

import java.util.List;

public interface IProductService {
    ProductResponse saveProduct(int brandId, int categoryId, ProductRequest productRequest);
    List<ProductResponse> getAllProducts();
    ProductResponse getProductById(int id);
    List<ProductResponse> getUserWishlist();
    ProductResponse updateProduct(int id, int brandId, int cateoryId, ProductRequest productRequest);
    void deleteProduct(int id);
    List<ProductResponse> searchProducts(String productName, Integer categoryId, Integer brandId);
    List<ProductResponse> getProductsByCategoryId(int categoryId);
    List<ProductResponse> getProductsByBrandId(int brandId);
}
