package com.lactobloom.controller;

import com.lactobloom.dto.ProductRequest;
import com.lactobloom.dto.ProductResponse;
import com.lactobloom.dto.WishlistDto;
import com.lactobloom.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private IProductService productService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PostMapping("/save/brand/{brandId}/category/{categoryId}")
    public ResponseEntity<ProductResponse> saveProduct(@PathVariable int brandId, @PathVariable int categoryId, @RequestBody ProductRequest productRequest) {
        return new ResponseEntity<>(productService.saveProduct(brandId, categoryId, productRequest), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable int id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    @GetMapping("/myWishlist")
    public List<ProductResponse> getWishlistsByUser() {
        return productService.getUserWishlist();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PutMapping("/update/{id}/brand/{brandId}/category/{categoryId}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable int id, @PathVariable int brandId, @PathVariable int categoryId, @RequestBody ProductRequest productRequest) {
        return new ResponseEntity<>(productService.updateProduct(id, brandId, categoryId, productRequest), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>("Product deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<ProductResponse> searchProductsByName(@RequestParam String productName) {
        return productService.searchProductsByName(productName);
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductResponse> getProductsByCategoryId(@PathVariable int categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

    @GetMapping("/brand/{brandId}")
    public List<ProductResponse> getProductsByBrandId(@PathVariable int brandId) {
        return productService.getProductsByBrandId(brandId);
    }
}
