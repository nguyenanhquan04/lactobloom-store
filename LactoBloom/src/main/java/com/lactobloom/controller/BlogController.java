package com.lactobloom.controller;

import com.lactobloom.model.Blog;
import com.lactobloom.model.BlogCategory;
import com.lactobloom.model.User;
import com.lactobloom.service.interfaces.IBlogCategoryService;
import com.lactobloom.service.interfaces.IBlogService;
import com.lactobloom.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogController {

    @Autowired
    private IBlogService blogService;

    @PostMapping("/save/category/{categoryId}/user/{userId}")
    public ResponseEntity<Blog> saveBlog(@PathVariable int categoryId, @PathVariable int userId, @RequestBody Blog blog) {
        return new ResponseEntity<>(blogService.saveBlog(blog, categoryId, userId), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable int id) {
        return new ResponseEntity<>(blogService.getBlogById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable int id, @RequestBody Blog blog) {
        return new ResponseEntity<>(blogService.updateBlog(blog, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable int id) {
        blogService.deleteBlog(id);
        return new ResponseEntity<>("Blog deleted successfully!", HttpStatus.OK);
    }
}