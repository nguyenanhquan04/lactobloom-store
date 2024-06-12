package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ProductDto;
import com.lactobloom.model.Product;

import java.util.List;

public interface IProductService {
    ProductDto saveProduct(int brandId, int categoryId, ProductDto productDto);
    List<ProductDto> getAllProducts();
    ProductDto getProductById(int id);
    ProductDto updateProduct(int id, int brandId, int cateoryId, ProductDto productDto);
    void deleteProduct(int id);
    List<ProductDto> searchProductsByName(String productName);
    List<ProductDto> getProductsByCategoryId(int categoryId);
    List<ProductDto> getProductsByBrandId(int brandId);
}
