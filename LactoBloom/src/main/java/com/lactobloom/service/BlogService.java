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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BlogService implements IBlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private BlogCategoryRepository blogCategoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    @Override
    public BlogDto saveBlog(MultipartFile multipartFile, BlogDto blogDto, int categoryId) throws IOException {
        Blog blog = mapToEntity(blogDto);
        BlogCategory blogCategory = blogCategoryRepository.findByBlogCategoryIdAndDeletedFalse(categoryId).orElseThrow(() ->
            new ResourceNotFoundException("Blog Category", "Id", categoryId));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmailAndDeletedFalse(email).orElseThrow(() ->
                new ResourceNotFoundException("User", "email", email));
        String fileName = multipartFile.getOriginalFilename();
        File file = imageService.convertToFile(multipartFile, fileName);
        String URL = imageService.uploadFile(file, fileName, multipartFile.getContentType());
        file.delete();
        blog.setBlogCategory(blogCategory);
        blog.setImageUrl(URL);
        blog.setUser(user);
        Blog newBlog = blogRepository.save(blog);
        return mapToDto(newBlog);
    }

    @Override
    public List<BlogDto> getAllBlogs() {
        List<Blog> blogList = blogRepository.findByDeletedFalse();
        return blogList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BlogDto getBlogById(int id) {
        Blog blog = blogRepository.findByBlogIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", id));
        return mapToDto(blog);
    }

    @Override
    public List<BlogDto> getBlogsByCategory(int blogCategoryId) {
        List<Blog> blogList = blogRepository.findByBlogCategory_BlogCategoryIdAndDeletedFalse(blogCategoryId);
        return blogList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BlogDto updateBlog(BlogDto blogDto, int id, int categoryId, MultipartFile multipartFile) throws IOException {
        Blog existingBlog = blogRepository.findByBlogIdAndDeletedFalse(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", id));
        BlogCategory blogCategory = blogCategoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Blog Category", "Id", categoryId));
        existingBlog.setBlogCategory(blogCategory);
        if (multipartFile != null && !multipartFile.isEmpty()) {
            if (imageService.isFirebaseUrl(blogDto.getImageUrl())) {
                try {
                    String oldFileName = blogDto.getImageUrl().substring(blogDto.getImageUrl().lastIndexOf("/") + 1, blogDto.getImageUrl().indexOf("?"));
                    imageService.deleteFile(oldFileName);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to delete file from Firebase", e);
                }
            }
            String fileName = multipartFile.getOriginalFilename();
            assert fileName != null;
            fileName = UUID.randomUUID().toString().concat(imageService.getExtension(fileName));
            File file = imageService.convertToFile(multipartFile, fileName);
            String url = imageService.uploadFile(file, fileName, multipartFile.getContentType());
            file.delete();
            existingBlog.setImageUrl(url);
        } else
            existingBlog.setImageUrl(blogDto.getImageUrl());
        existingBlog.setTitle(blogDto.getTitle());
        existingBlog.setShortDescription(blogDto.getShortDescription());
        existingBlog.setContent(blogDto.getContent());
        return mapToDto(blogRepository.save(existingBlog));
    }

    @Override
    public void deleteBlog(int id) {
        Blog blog = blogRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", id));
        blog.setDeleted(true);
        blogRepository.save(blog);
    }

    @Override
    public List<BlogDto> searchBlogsByTitle(String title) {
        List<Blog> blogList = blogRepository.findByTitleContainingIgnoreCaseAndDeletedFalse(title);
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
        blog.setShortDescription(blogDto.getShortDescription());
        blog.setTitle(blogDto.getTitle());
        blog.setContent(blogDto.getContent());
        blog.setPublishDate(blogDto.getPublishDate());
        return blog;
    }
}