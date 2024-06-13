package com.lactobloom.controller;

import com.lactobloom.dto.BrandDto;
import com.lactobloom.dto.CategoryDto;
import com.lactobloom.model.Category;
import com.lactobloom.service.interfaces.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @PostMapping("/save")
    public ResponseEntity<CategoryDto> saveCategory(@RequestBody CategoryDto categoryDto) {
        return new ResponseEntity<>(categoryService.saveCategory(categoryDto), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<CategoryDto> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable int id) {
        return new ResponseEntity<>(categoryService.getCategoryById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable int id, @RequestBody CategoryDto categoryDto) {
        return new ResponseEntity<>(categoryService.updateCategory(categoryDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>("Category deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/getByProductId/{id}")
    public ResponseEntity<CategoryDto> getByProductId(@PathVariable int id) {
        return new ResponseEntity<>(categoryService.findCategoryByProductId(id), HttpStatus.OK);
    }
}
