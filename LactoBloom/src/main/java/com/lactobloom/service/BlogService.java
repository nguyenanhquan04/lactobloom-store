package com.lactobloom.service;

import com.lactobloom.dto.BlogDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Blog;
import com.lactobloom.model.BlogCategory;
import com.lactobloom.model.User;
import com.lactobloom.repository.BlogCategoryRepository;
import com.lactobloom.repository.BlogRepository;
import com.lactobloom.repository.UserRepository;
import com.lactobloom.service.interfaces.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService implements IBlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private BlogCategoryRepository blogCategoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public BlogDto saveBlog(BlogDto blogDto, int categoryId) {
        Blog blog = mapToEntity(blogDto);
        BlogCategory blogCategory = blogCategoryRepository.findById(categoryId).orElseThrow(() ->
            new ResourceNotFoundException("Blog", "Id", categoryId));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        blog.setBlogCategory(blogCategory);
        blog.setUser(user);
        Blog newBlog = blogRepository.save(blog);
        return mapToDto(newBlog);
    }

    @Override
    public List<BlogDto> getAllBlogs() {
        List<Blog> blogList = blogRepository.findAll();
        return blogList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BlogDto getBlogById(int id) {
        Blog blog = blogRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", id));
        return mapToDto(blog);
    }

    @Override
    public List<BlogDto> getBlogsByCategory(int blogCategoryId) {
        List<Blog> blogList = blogRepository.findByBlogCategory_BlogCategoryId(blogCategoryId);
        return blogList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BlogDto updateBlog(BlogDto blogDto, int id, int categoryId) {
        Blog existingBlog = blogRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", id));
        BlogCategory blogCategory = blogCategoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Blog Category", "Id", categoryId));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        existingBlog.setBlogCategory(blogCategory);
        existingBlog.setUser(user);
        existingBlog.setImageUrl(blogDto.getImageUrl());
        existingBlog.setTitle(blogDto.getTitle());
        existingBlog.setContent(blogDto.getContent());
        return mapToDto(blogRepository.save(existingBlog));
    }

    @Override
    public void deleteBlog(int id) {
        blogRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", id));
        blogRepository.deleteById(id);
    }

    @Override
    public List<BlogDto> searchBlogsByTitle(String title) {
        List<Blog> blogList = blogRepository.findByTitleContaining(title);
        return blogList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private BlogDto mapToDto (Blog blog){
        BlogDto blogResponse = new BlogDto();
        blogResponse.setBlogId(blog.getBlogId());
        blogResponse.setImageUrl(blog.getImageUrl());
        blogResponse.setBlogCategoryName(blog.getBlogCategory().getBlogCategoryName());
        blogResponse.setTitle(blog.getTitle());
        blogResponse.setShortDescription(blog.getShortDescription());
        blogResponse.setContent(blog.getContent());
        blogResponse.setPublishDate(blog.getPublishDate());
        return blogResponse;
    }

    private Blog mapToEntity(BlogDto blogDto){
        Blog blog = new Blog();
        blog.setImageUrl(blogDto.getImageUrl());
        blog.setTitle(blogDto.getTitle());
        blog.setContent(blogDto.getContent());
        blog.setPublishDate(blogDto.getPublishDate());
        return blog;
    }
}
