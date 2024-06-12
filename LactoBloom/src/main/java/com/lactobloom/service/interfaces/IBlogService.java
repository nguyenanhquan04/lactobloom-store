package com.lactobloom.service.interfaces;

import com.lactobloom.dto.BlogDto;

import java.util.List;

public interface IBlogService {
    BlogDto saveBlog(BlogDto blogDto, int categoryId, int userId);
    List<BlogDto> getAllBlogs();
    BlogDto getBlogById(int id);
    BlogDto updateBlog(BlogDto blogDto, int id, int categoryId, int userId);
    void deleteBlog(int id);
    List<BlogDto> searchBlogsByTitle(String title);
}
