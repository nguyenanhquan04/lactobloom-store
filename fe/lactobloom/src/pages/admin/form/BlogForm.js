import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Cookies from 'js-cookie';

const BlogForm = ({ onSave, initialBlog }) => {
  const [blog, setBlog] = useState({
    imageUrl: '',
    blogCategoryId: '', // Default value for blogCategoryId
    title: '',
    shortDescription: '',
    content: '',
    publishDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16)
  });
  const [blogCategories, setBlogCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/blog-category/all');
        setBlogCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBlogData = async () => {
      if (initialBlog) {
        try {
          const categoryResponse = await axios.get(`http://localhost:8080/blog-category/getByBlogId/${initialBlog.blogId}`);
          const publishDate = new Date(new Date(initialBlog.publishDate).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16);
          setBlog({
            ...initialBlog,
            blogCategoryId: categoryResponse.data.blogCategoryId || '', // Ensure default empty string
            publishDate: publishDate
          });
        } catch (error) {
          console.error('Error fetching blog data:', error);
        }
      }
    };

    fetchCategories();
    fetchBlogData();
  }, [initialBlog]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog(prevBlog => ({
      ...prevBlog,
      [name]: value || '' // Handle empty values
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setBlog(prevBlog => ({
      ...prevBlog,
      content: data
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get('authToken');
    const blogCategoryId = blogCategories.find(blogCategory => blogCategory.blogCategoryId === blog.blogCategoryId)?.blogCategoryId;
    const url = initialBlog 
      ? `http://localhost:8080/blog/update/${initialBlog.blogId}/category/${blogCategoryId}`
      : `http://localhost:8080/blog/save/category/${blogCategoryId}`;
    
    const blogData = {
      imageUrl: blog.imageUrl,
      title: blog.title,
      shortDescription: blog.shortDescription,
      content: blog.content,
      publishDate: blog.publishDate
    };
    
    try {
      if (initialBlog) {
        await axios.put(url, blogData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(url, blogData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={blog.title || ''} // Ensure default empty string
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="imageUrl"
            label="Image URL"
            variant="outlined"
            fullWidth
            value={blog.imageUrl || ''} // Ensure default empty string
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="blogCategoryId"
              value={blog.blogCategoryId || ''} // Ensure default empty string
              onChange={handleChange}
              label="Category"
              required
            >
              {blogCategories.map((blogCategory) => (
                <MenuItem key={blogCategory.blogCategoryId} value={blogCategory.blogCategoryId}>
                  {blogCategory.blogCategoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="shortDescription"
            label="Short Description"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={blog.shortDescription || ''} // Ensure default empty string
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CKEditor
            editor={ClassicEditor}
            data={blog.content || ''} // Ensure default empty string
            onChange={handleEditorChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="publishDate"
            label="Publish Date"
            variant="outlined"
            fullWidth
            type="datetime-local"
            value={blog.publishDate || ''} // Ensure default empty string
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {initialBlog ? 'Update Blog' : 'Add Blog'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogForm;
