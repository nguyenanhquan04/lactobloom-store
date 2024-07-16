package com.lactobloom.service;

import com.lactobloom.dto.BlogCategoryDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.BlogCategory;
import com.lactobloom.repository.BlogCategoryRepository;
import com.lactobloom.service.interfaces.IBlogCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogCategoryService implements IBlogCategoryService {

    @Autowired
    private BlogCategoryRepository blogCategoryRepository;

    @Override
    public BlogCategoryDto saveBlogCategory(BlogCategoryDto blogCategoryDto) {
        BlogCategory blogCategory = mapToEntity(blogCategoryDto);
        BlogCategory newBlogCategory = blogCategoryRepository.save(blogCategory);
        return mapToDto(newBlogCategory);
    }

    @Override
    public List<BlogCategoryDto> getAllBlogCategories() {
        List<BlogCategory> blogCategoryList = blogCategoryRepository.findByDeletedFalse();
        return blogCategoryList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BlogCategoryDto getBlogCategoryByBlogId(int id) {
        BlogCategory blogCategory = blogCategoryRepository.findByBlogsBlogId(id);
        return mapToDto(blogCategory);
    }

    @Override
    public BlogCategoryDto getBlogCategoryById(int id) {
        BlogCategory blogCategory = blogCategoryRepository.findByBlogCategoryIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog Category", "Id", id));
        return mapToDto(blogCategory);
    }

    @Override
    public BlogCategoryDto updateBlogCategory(BlogCategoryDto blogCategory, int id) {
        BlogCategory existingBlogCategory = blogCategoryRepository.findByBlogCategoryIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog Category", "Id", id));
        existingBlogCategory.setBlogCategoryName(blogCategory.getBlogCategoryName());
        return mapToDto(blogCategoryRepository.save(existingBlogCategory));
    }

    @Override
    public void deleteBlogCategory(int id) {
        BlogCategory blogCategory = blogCategoryRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog Category", "Id", id));
        blogCategory.setDeleted(true);
        blogCategoryRepository.save(blogCategory);
    }

    private BlogCategoryDto mapToDto (BlogCategory blogCategory){
        BlogCategoryDto blogCategoryResponse = new BlogCategoryDto();
        blogCategoryResponse.setBlogCategoryId(blogCategory.getBlogCategoryId());
        blogCategoryResponse.setBlogCategoryName(blogCategory.getBlogCategoryName());
        return blogCategoryResponse;
    }

    private BlogCategory mapToEntity (BlogCategoryDto blogCategoryDto){
        BlogCategory blogCategory = new BlogCategory();
        blogCategory.setBlogCategoryName(blogCategoryDto.getBlogCategoryName());
        return blogCategory;
    }
}
