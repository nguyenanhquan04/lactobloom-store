package com.lactobloom.service.interfaces;

import com.lactobloom.model.Category;


import java.util.List;

public interface ICategoryService {
    Category saveCategory(Category category);
    List<Category> getAllCategories();
    Category getCategoryById(int id);
    Category updateCategory(Category category, int id);
    void deleteCategory(int id);
}
