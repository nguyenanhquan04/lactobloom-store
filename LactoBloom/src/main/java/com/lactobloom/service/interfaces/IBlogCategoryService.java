package com.lactobloom.service.interfaces;

import com.lactobloom.dto.BlogCategoryDto;

import java.util.List;

public interface IBlogCategoryService {
    BlogCategoryDto saveBlogCategory(BlogCategoryDto blogCategoryDto);
    List<BlogCategoryDto> getAllBlogCategories();
    BlogCategoryDto getBlogCategoryByBlogId(int id);
    BlogCategoryDto getBlogCategoryById(int id);
    BlogCategoryDto updateBlogCategory(BlogCategoryDto blogCategoryDto, int id);
    void deleteBlogCategory(int id);
}
