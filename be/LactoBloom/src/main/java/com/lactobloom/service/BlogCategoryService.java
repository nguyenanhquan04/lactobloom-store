package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.BlogCategory;
import com.lactobloom.repository.BlogCategoryRepository;
import com.lactobloom.service.interfaces.IBlogCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BlogCategoryService implements IBlogCategoryService {

    @Autowired
    private BlogCategoryRepository blogCategoryRepository;

    @Override
    public BlogCategory saveBlogCategory(BlogCategory blogCategory) {
        return blogCategoryRepository.save(blogCategory);
    }

    @Override
    public List<BlogCategory> getAllBlogCategories() {
        return blogCategoryRepository.findAll();
    }

    @Override
    public BlogCategory getBlogCategoryById(int id) {
        return blogCategoryRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog Category", "Id", id));
    }

    @Override
    public BlogCategory updateBlogCategory(BlogCategory blogCategory, int id) {
        BlogCategory existingBlogCategory = blogCategoryRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog Category", "Id", id));

        existingBlogCategory.setBlogCategoryName(blogCategory.getBlogCategoryName());
        return blogCategoryRepository.save(existingBlogCategory);
    }

    @Override
    public void deleteBlogCategory(int id) {
        blogCategoryRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog Category", "Id", id));
        blogCategoryRepository.deleteById(id);
    }
}
