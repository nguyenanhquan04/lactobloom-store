package com.lactobloom.service;

import com.lactobloom.dto.ProductDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.*;
import com.lactobloom.repository.*;
import com.lactobloom.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
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
    public ProductDto.ProductResponse saveProduct(int brandId, int categoryId, ProductDto.ProductRequest productRequest) {
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
    public List<ProductDto.ProductResponse> getAllProducts() {
        List<Product> productList = productRepository.findByDeletedFalse();
        return productList.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public ProductDto.ProductResponse getProductById(int id) {
        Product product = productRepository.findByProductIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        return mapToResponse(product);
    }

    @Override
    public List<ProductDto.ProductResponse> get4RandomProducts() {
        List<Product> productList = productRepository.findByDeletedFalse();
        Collections.shuffle(productList);
        return productList.stream().limit(4).map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public ProductDto.ProductResponse getProductByWishlistId(int wishlistId){
        Wishlist wishlist = wishlistRepository.findById(wishlistId).orElseThrow(() ->
                new ResourceNotFoundException("Wishlist", "Id", wishlistId));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        if(wishlist.getUser() == user)
            return mapToResponse(wishlist.getProduct());
        return null;
    }

    @Override
    public ProductDto.ProductResponse updateProduct(int id, int brandId, int categoryId, ProductDto.ProductRequest productRequest) {
        Product existingProduct = productRepository.findByProductIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        Brand brand = brandRepository.findById(brandId).orElseThrow(() ->
                new ResourceNotFoundException("Brand", "Id", brandId));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Category", "Id", categoryId));
        existingProduct.setProductName(productRequest.getProductName());
        existingProduct.setBrand(brand);
        existingProduct.setCategory(category);
        existingProduct.setDescription(productRequest.getDescription());
        existingProduct.setLongDescription(productRequest.getLongDescription());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setDiscount(productRequest.getDiscount());
        existingProduct.setStock(productRequest.getStock());
        existingProduct.setPreOrder(productRequest.isPreOrder());
        return mapToResponse(productRepository.save(existingProduct));
    }

    @Override
    public void deleteProduct(int id) {
        Product product = productRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", id));
        product.setDeleted(true);
        productRepository.save(product);
        wishlistRepository.deleteByProductProductId(id);
    }

    @Override
    public List<ProductDto.ProductResponse> searchProducts(String productName, Integer categoryId, Integer brandId) {
        if (categoryId != null && brandId != null) {
            return productRepository.findByProductNameContainingIgnoreCaseAndCategoryCategoryIdAndBrandBrandIdAndDeletedFalse(productName, categoryId, brandId)
                    .stream().map(this::mapToResponse).collect(Collectors.toList());
        }
        else if (categoryId != null) {
            return productRepository.findByProductNameContainingIgnoreCaseAndCategoryCategoryIdAndDeletedFalse(productName, categoryId)
                    .stream().map(this::mapToResponse).collect(Collectors.toList());
        }
        else if (brandId != null) {
            return productRepository.findByProductNameContainingIgnoreCaseAndBrandBrandIdAndDeletedFalse(productName, brandId)
                    .stream().map(this::mapToResponse).collect(Collectors.toList());
        }
        return productRepository.findByProductNameContainingIgnoreCaseAndDeletedFalse(productName)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto.ProductResponse> getProductsByCategoryId(int categoryId) {
        return productRepository.findByCategoryCategoryIdAndDeletedFalse(categoryId).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto.ProductResponse> getProductsByBrandId(int brandId) {
        return productRepository.findByBrandBrandIdAndDeletedFalse(brandId).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private ProductDto.ProductResponse mapToResponse (Product product){
        ProductDto.ProductResponse productResponse = new ProductDto.ProductResponse();
        productResponse.setProductId(product.getProductId());
        productResponse.setProductName(product.getProductName());
        productResponse.setBrandName(product.getBrand().getBrandName());
        productResponse.setCategoryName(product.getCategory().getCategoryName());
        productResponse.setDescription(product.getDescription());
        productResponse.setLongDescription(product.getLongDescription());
        productResponse.setPrice(product.getPrice());
        productResponse.setDiscount(product.getDiscount());
        productResponse.setStock(product.getStock());
        productResponse.setPreOrder(product.isPreOrder());
        return productResponse;
    }

    private Product mapToEntity(ProductDto.ProductRequest productRequest){
        Product product = new Product();
        product.setProductName(productRequest.getProductName());
        product.setDescription(productRequest.getDescription());
        product.setLongDescription(productRequest.getLongDescription());
        product.setPrice(productRequest.getPrice());
        product.setDiscount(productRequest.getDiscount());
        product.setStock(productRequest.getStock());
        product.setPreOrder(productRequest.isPreOrder());
        return product;
    }
}
