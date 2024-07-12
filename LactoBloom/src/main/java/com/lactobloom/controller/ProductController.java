package com.lactobloom.controller;

import com.lactobloom.dto.ProductDto;
import com.lactobloom.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private IProductService productService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PostMapping("/save/brand/{brandId}/category/{categoryId}")
    public ResponseEntity<ProductDto.ProductResponse> saveProduct(@PathVariable int brandId, @PathVariable int categoryId, @RequestBody ProductDto.ProductRequest productRequest) {
        return new ResponseEntity<>(productService.saveProduct(brandId, categoryId, productRequest), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<ProductDto.ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductDto.ProductResponse> getProductById(@PathVariable int id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    @GetMapping("/random")
    public List<ProductDto.ProductResponse> get4RandomProducts() {
        return productService.get4RandomProducts();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PutMapping("/update/{id}/brand/{brandId}/category/{categoryId}")
    public ResponseEntity<ProductDto.ProductResponse> updateProduct(@PathVariable int id, @PathVariable int brandId, @PathVariable int categoryId, @RequestBody ProductDto.ProductRequest productRequest) {
        return new ResponseEntity<>(productService.updateProduct(id, brandId, categoryId, productRequest), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>("Product deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<ProductDto.ProductResponse> searchProducts(@RequestParam String productName, @RequestParam(required = false) Integer categoryId, @RequestParam(required = false) Integer brandId) {
        return productService.searchProducts(productName, categoryId, brandId);
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductDto.ProductResponse> getProductsByCategoryId(@PathVariable int categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

    @GetMapping("/brand/{brandId}")
    public List<ProductDto.ProductResponse> getProductsByBrandId(@PathVariable int brandId) {
        return productService.getProductsByBrandId(brandId);
    }

    @GetMapping("/wishlist/{wishlistId}")
    public ResponseEntity<ProductDto.ProductResponse> getProductByWishlistId(@PathVariable int wishlistId) {
        return new ResponseEntity<>(productService.getProductByWishlistId(wishlistId), HttpStatus.OK);
    }
}
