package com.lactobloom.controller;

import com.lactobloom.dto.BlogCategoryDto;
import com.lactobloom.service.interfaces.IBlogCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog-category")
public class BlogCategoryController {

    @Autowired
    private IBlogCategoryService blogCategoryService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PostMapping("/save")
    public ResponseEntity<BlogCategoryDto> saveBlogCategory(@RequestBody BlogCategoryDto blogCategoryDto) {
        return new ResponseEntity<>(blogCategoryService.saveBlogCategory(blogCategoryDto), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<BlogCategoryDto> getAllBlogCategories() {
        return blogCategoryService.getAllBlogCategories();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/get/{id}")
    public ResponseEntity<BlogCategoryDto> getBlogCategoryById(@PathVariable int id) {
        return new ResponseEntity<>(blogCategoryService.getBlogCategoryById(id), HttpStatus.OK);
    }

    @GetMapping("/getByBlogId/{id}")
    public ResponseEntity<BlogCategoryDto> getBlogCategoryByBlogId(@PathVariable int id) {
        return new ResponseEntity<>(blogCategoryService.getBlogCategoryByBlogId(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PutMapping("/update/{id}")
    public ResponseEntity<BlogCategoryDto> updateBlogCategory(@PathVariable int id, @RequestBody BlogCategoryDto blogCategoryDto) {
        return new ResponseEntity<>(blogCategoryService.updateBlogCategory(blogCategoryDto, id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBlogCategory(@PathVariable int id) {
        blogCategoryService.deleteBlogCategory(id);
        return new ResponseEntity<>("Blog category deleted successfully!", HttpStatus.OK);
    }
}
