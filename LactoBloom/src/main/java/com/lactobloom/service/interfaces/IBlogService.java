package com.lactobloom.service.interfaces;

import com.lactobloom.dto.BlogDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IBlogService {
    BlogDto saveBlog(MultipartFile file, BlogDto blogDto, int categoryId) throws IOException;
    List<BlogDto> getAllBlogs();
    BlogDto getBlogById(int id);
    List<BlogDto> getBlogsByCategory(int blogCategoryId);
    BlogDto updateBlog(BlogDto blogDto, int id, int categoryId, MultipartFile file) throws IOException;
    void deleteBlog(int id);
    List<BlogDto> searchBlogsByTitle(String title);
}
