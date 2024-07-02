import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Typography, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SoftButton from 'components/SoftButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Keeping this for the Quill editor theme
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const BlogEditForm = ({ onSave }) => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    blogId: '',
    imageUrl: '',
    title: '',
    content: '',
    publishDate: new Date(),
    categoryId: '', // Add categoryId for editing
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const authToken = Cookies.get('authToken');
        const headers = {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        };

        const blogResponse = await axios.get(`http://localhost:8080/blog/get/${blogId}`, { headers });
        const fetchedBlog = blogResponse.data;

        const categoriesResponse = await axios.get('http://localhost:8080/blog-category/all', { headers });
        setCategories(categoriesResponse.data);

        setBlog({
          blogId: fetchedBlog.blogId.toString(),
          imageUrl: fetchedBlog.imageUrl,
          title: fetchedBlog.title,
          content: fetchedBlog.content,
          publishDate: new Date(fetchedBlog.publishDate),
          categoryId: fetchedBlog.categoryId, // Set categoryId for editing
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = Cookies.get('authToken');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const data = {
        imageUrl: blog.imageUrl,
        title: blog.title,
        content: blog.content,
        publishDate: blog.publishDate.toISOString(), // Ensure publishDate is in ISO string format
        categoryId: blog.categoryId, // Include categoryId for update
      };

      const response = await axios.put(`http://localhost:8080/blog/update/category/${blog.categoryId}/${blogId}`, data, { headers });
      toast.success('Blog updated successfully!');
      onSave(response.data); // Pass updated blog data to parent component
      setTimeout(() => {
        navigate('/blogs'); // Navigate to the blog list after a short delay
      }, 1000);
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Error updating blog.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleContentChange = (content) => {
    setBlog({
      ...blog,
      content: content,
    });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setBlog({
      ...blog,
      categoryId: categoryId,
    });
  };

  return (
    <>
      <ToastContainer />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} style={styles.form}>
            <Typography variant="h3" gutterBottom> Edit Blog </Typography>
            <form onSubmit={handleSubmit}>
              {/* Image URL Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Image URL:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="imageUrl"
                    value={blog.imageUrl}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Title Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Title:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="title"
                    value={blog.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Content Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Content:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <ReactQuill
                    value={blog.content}
                    onChange={handleContentChange}
                    theme="snow"
                    placeholder="Write your content here..."
                  />
                </Grid>
              </Grid>
              {/* Publish Date Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Publish Date:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{new Date(blog.publishDate).toLocaleDateString()}</Typography>
                </Grid>
              </Grid>
              {/* Category Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Category:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    select
                    name="categoryId"
                    value={blog.categoryId}
                    onChange={handleCategoryChange}
                    fullWidth
                    required
                    margin="normal"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.blogCategoryId} value={category.blogCategoryId}>
                        {category.blogCategoryName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              {/* Save Button */}
              <Box mt={2}>
                <SoftButton type="submit" variant="contained" color="info">
                  Save
                </SoftButton>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

BlogEditForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default BlogEditForm;
