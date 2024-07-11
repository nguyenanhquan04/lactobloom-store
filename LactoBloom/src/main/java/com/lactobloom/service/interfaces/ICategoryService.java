package com.lactobloom.service.interfaces;

import com.lactobloom.dto.CategoryDto;

import java.util.List;

public interface ICategoryService {
    CategoryDto saveCategory(CategoryDto categoryDto);
    List<CategoryDto> getAllCategories();
    CategoryDto getCategoryById(int id);
    CategoryDto updateCategory(CategoryDto categoryDto, int id);
    void deleteCategory(int id);
    CategoryDto findCategoryByProductId(int id);
}
