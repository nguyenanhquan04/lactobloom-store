package com.lactobloom.service.interfaces;

import com.lactobloom.dto.BlogDto;

import java.util.List;

public interface IBlogService {
    BlogDto saveBlog(BlogDto blogDto, int categoryId);
    List<BlogDto> getAllBlogs();
    BlogDto getBlogById(int id);
    List<BlogDto> getBlogsByCategory(int blogCategoryId);
    BlogDto updateBlog(BlogDto blogDto, int id, int categoryId);
    void deleteBlog(int id);
    List<BlogDto> searchBlogsByTitle(String title);
}
