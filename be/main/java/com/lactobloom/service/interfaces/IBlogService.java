package com.lactobloom.service.interfaces;

import com.lactobloom.model.Blog;

import java.util.List;

public interface IBlogService {
    Blog saveBlog(Blog blog);
    List<Blog> getAllBlogs();
    Blog getBlogById(int id);
    Blog updateBlog(Blog blog, int id);
    void deleteBlog(int id);
}
