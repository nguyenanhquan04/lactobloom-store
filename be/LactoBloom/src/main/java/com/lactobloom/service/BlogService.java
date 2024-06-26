package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Blog;
import com.lactobloom.repository.BlogRepository;
import com.lactobloom.service.interfaces.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService implements IBlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public Blog saveBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public Blog getBlogById(int id) {
        return blogRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", id));
    }

    @Override
    public Blog updateBlog(Blog blog, int id) {
        Blog existingBlog = blogRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", id));

        existingBlog.setTitle(blog.getTitle());
        existingBlog.setContent(blog.getContent());
        // Update other fields as needed
        return blogRepository.save(existingBlog);
    }

    @Override
    public void deleteBlog(int id) {
        blogRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Blog", "Id", id));
        blogRepository.deleteById(id);
    }
}
