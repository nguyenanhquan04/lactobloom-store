package com.lactobloom.service;

import com.lactobloom.dto.CategoryDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Category;
import com.lactobloom.repository.CategoryRepository;
import com.lactobloom.service.interfaces.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryDto saveCategory(CategoryDto categoryDto) {
        Category category = mapToEntity(categoryDto);
        return mapToDto(categoryRepository.save(category));
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categoryList = categoryRepository.findByDeletedFalse();
        return categoryList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategoryById(int id) {
        Category category = categoryRepository.findByCategoryIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Category", "Id", id));
        return mapToDto(category);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, int id) {
        Category existingCategory = categoryRepository.findByCategoryIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Category", "Id", id));
        existingCategory.setCategoryName(categoryDto.getCategoryName());
        return mapToDto(categoryRepository.save(existingCategory));
    }

    @Override
    public void deleteCategory(int id) {
        Category category = categoryRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Category", "Id", id));
        category.setDeleted(true);
        categoryRepository.save(category);
    }

    @Override
    public CategoryDto findCategoryByProductId(int id) {
        return mapToDto(categoryRepository.findByProductsProductId(id));
    }

    private CategoryDto mapToDto (Category category){
        CategoryDto categoryResponse = new CategoryDto();
        categoryResponse.setCategoryId(category.getCategoryId());
        categoryResponse.setCategoryName(category.getCategoryName());
        return categoryResponse;
    }

    private Category mapToEntity(CategoryDto categoryDto){
        Category category = new Category();
        category.setCategoryName(categoryDto.getCategoryName());
        return category;
    }
}
