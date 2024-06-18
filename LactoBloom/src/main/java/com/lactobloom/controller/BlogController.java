package com.lactobloom.controller;

import com.lactobloom.dto.BlogDto;
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
@CrossOrigin(origins = "*")
public class BlogController {

    @Autowired
    private IBlogService blogService;

    @PostMapping("/save/category/{categoryId}")
    public ResponseEntity<BlogDto> saveBlog(@PathVariable int categoryId, @RequestBody BlogDto blogDto) {
        return new ResponseEntity<>(blogService.saveBlog(blogDto, categoryId), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<BlogDto> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<BlogDto> getBlogById(@PathVariable int id) {
        return new ResponseEntity<>(blogService.getBlogById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}/category/{categoryId}")
    public ResponseEntity<BlogDto> updateBlog(@PathVariable int id, @PathVariable int categoryId, @RequestBody BlogDto blogDto) {
        return new ResponseEntity<>(blogService.updateBlog(blogDto, id, categoryId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable int id) {
        blogService.deleteBlog(id);
        return new ResponseEntity<>("Blog deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<BlogDto> searchBlogsByTitle(@RequestParam String title) {
        return blogService.searchBlogsByTitle(title);
    }
}