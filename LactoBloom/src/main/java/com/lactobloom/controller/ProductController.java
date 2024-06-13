package com.lactobloom.controller;

import com.lactobloom.dto.ProductDto;
import com.lactobloom.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private IProductService productService;

    @PostMapping("/save/brand/{brandId}/category/{categoryId}")
    public ResponseEntity<ProductDto> saveProduct(@PathVariable int brandId, @PathVariable int categoryId, @RequestBody ProductDto productDto) {
        return new ResponseEntity<>(productService.saveProduct(brandId, categoryId, productDto), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<ProductDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable int id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}/brand/{brandId}/category/{categoryId}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable int id, @PathVariable int brandId, @PathVariable int categoryId, @RequestBody ProductDto productDto) {
        return new ResponseEntity<>(productService.updateProduct(id, brandId, categoryId, productDto), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>("Product deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<ProductDto> searchProductsByName(@RequestParam String productName) {
        return productService.searchProductsByName(productName);
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductDto> getProductsByCategoryId(@PathVariable int categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

    @GetMapping("/brand/{brandId}")
    public List<ProductDto> getProductsByBrandId(@PathVariable int brandId) {
        return productService.getProductsByBrandId(brandId);
    }
}
