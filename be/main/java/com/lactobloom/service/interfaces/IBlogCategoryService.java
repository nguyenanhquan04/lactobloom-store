package com.lactobloom.service.interfaces;

import com.lactobloom.model.BlogCategory;

import java.util.List;

public interface IBlogCategoryService {
    BlogCategory saveBlogCategory(BlogCategory blogCategory);
    List<BlogCategory> getAllBlogCategories();
    BlogCategory getBlogCategoryById(int id);
    BlogCategory updateBlogCategory(BlogCategory blogCategory, int id);
    void deleteBlogCategory(int id);
}
