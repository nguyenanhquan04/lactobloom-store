package com.lactobloom.controller;

import com.lactobloom.model.BlogCategory;
import com.lactobloom.service.interfaces.IBlogCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog-category")
public class BlogCategoryController {

    @Autowired
    private IBlogCategoryService blogCategoryService;

    @PostMapping("/save")
    public ResponseEntity<BlogCategory> saveBlogCategory(@RequestBody BlogCategory blogCategory) {
        return new ResponseEntity<>(blogCategoryService.saveBlogCategory(blogCategory), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<BlogCategory> getAllBlogCategories() {
        return blogCategoryService.getAllBlogCategories();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<BlogCategory> getBlogCategoryById(@PathVariable int id) {
        return new ResponseEntity<>(blogCategoryService.getBlogCategoryById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BlogCategory> updateBlogCategory(@PathVariable int id,
                                                           @RequestBody BlogCategory blogCategory) {
        return new ResponseEntity<>(blogCategoryService.updateBlogCategory(blogCategory, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBlogCategory(@PathVariable int id) {
        blogCategoryService.deleteBlogCategory(id);
        return new ResponseEntity<>("Blog category deleted successfully!", HttpStatus.OK);
    }
}
