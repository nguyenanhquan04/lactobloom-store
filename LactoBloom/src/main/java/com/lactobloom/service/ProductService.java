package com.lactobloom.service;

import com.lactobloom.dto.ProductRequest;
import com.lactobloom.dto.ProductResponse;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.*;
import com.lactobloom.repository.*;
import com.lactobloom.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ProductResponse saveProduct(int brandId, int categoryId, ProductRequest productRequest) {
        Product product = mapToEntity(productRequest);
        Brand brand = brandRepository.findById(brandId).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", brandId));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Category", "Id", categoryId));
        product.setBrand(brand);
        product.setCategory(category);
        Product newProduct = productRepository.save(product);
        return mapToResponse(newProduct);
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        List<Product> productList = productRepository.findAll();
        return productList.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public ProductResponse getProductById(int id) {
        Product product = productRepository.findById((long) id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        return mapToResponse(product);
    }

    @Override
    public List<ProductResponse> getUserWishlist(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        List<Wishlist> wishlist = wishlistRepository.findByUserUserId(user.getUserId());
        List<Product> productList = wishlist.stream().map(Wishlist::getProduct).toList();
        return productList.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public ProductResponse updateProduct(int id, int brandId, int categoryId, ProductRequest productRequest) {
        Product existingProduct = productRepository.findById((long) id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        Brand brand = brandRepository.findById(brandId).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", brandId));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Category", "Id", categoryId));
        existingProduct.setProductName(productRequest.getProductName());
        existingProduct.setBrand(brand);
        existingProduct.setCategory(category);
        existingProduct.setDescription(productRequest.getDescription());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setDiscount(productRequest.getDiscount());
        existingProduct.setStock(productRequest.getStock());
        return mapToResponse(productRepository.save(existingProduct));
    }

    @Override
    public void deleteProduct(int id) {
        productRepository.findById((long) id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        productRepository.deleteById((long) id);
    }

    @Override
    public List<ProductResponse> searchProducts(String productName, Integer categoryId, Integer brandId) {
        if (categoryId != null && brandId != null) {
            return productRepository.findByProductNameContainingIgnoreCaseAndCategoryCategoryIdAndBrandBrandId(productName, categoryId, brandId)
                    .stream().map(this::mapToResponse).collect(Collectors.toList());
        }
        else if (categoryId != null) {
            return productRepository.findByProductNameContainingIgnoreCaseAndCategoryCategoryId(productName, categoryId)
                    .stream().map(this::mapToResponse).collect(Collectors.toList());
        }
        else if (brandId != null) {
            return productRepository.findByProductNameContainingIgnoreCaseAndBrandBrandId(productName, brandId)
                    .stream().map(this::mapToResponse).collect(Collectors.toList());
        }
        return productRepository.findByProductNameContainingIgnoreCase(productName)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getProductsByCategoryId(int categoryId) {
        return productRepository.findByCategoryCategoryId(categoryId).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getProductsByBrandId(int brandId) {
        return productRepository.findByBrandBrandId(brandId).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private ProductResponse mapToResponse (Product product){
        ProductResponse productResponse = new ProductResponse();
        productResponse.setProductId(product.getProductId());
        productResponse.setProductName(product.getProductName());
        productResponse.setBrandName(product.getBrand().getBrandName());
        productResponse.setCategoryName(product.getCategory().getCategoryName());
        productResponse.setDescription(product.getDescription());
        productResponse.setPrice(product.getPrice());
        productResponse.setDiscount(product.getDiscount());
        productResponse.setStock(product.getStock());
        return productResponse;
    }

    private Product mapToEntity(ProductRequest productRequest){
        Product product = new Product();
        product.setProductName(productRequest.getProductName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setDiscount(productRequest.getDiscount());
        product.setStock(productRequest.getStock());
        return product;
    }
}
