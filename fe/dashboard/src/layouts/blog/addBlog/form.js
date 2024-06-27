import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Box, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftBox from 'components/SoftBox';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Keeping this for the Quill editor theme
import SoftTypography from 'components/SoftTypography';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BlogAddForm = ({ onSave }) => {
  const [blog, setBlog] = useState({
    blogId: '',
    imageUrl: '',
    title: '',
    content: '',
    publishDate: new Date(),
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigate = useNavigate();

  const today = new Date();

  useEffect(() => {
    fetchCategories(); // Fetch categories when component mounts
  }, []);

  const fetchCategories = async () => {
    try {
      const authToken = Cookies.get('authToken');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get('http://localhost:8080/blog-category/all', { headers });
      console.log(response.data);
      setCategories(response.data); // Assuming response.data is an array of category objects
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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
      };
  
      const response = await axios.post(`http://localhost:8080/blog/save/category/${selectedCategory}`, data, { headers });
      toast.success('Blog added successfully!');
      onSave(); // Refresh blog table or perform any necessary actions after saving
      setTimeout(() => {
        navigate('/blogs'); // Navigate to the blog table after a short delay
      }, 2000);
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error('Error adding blog.');
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
    setSelectedCategory(categoryId); // Update selectedCategory state with categoryId
  };

  return (
    <>
      <ToastContainer />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} style={styles.form}>
            <SoftTypography variant="h6" gutterBottom>Add New Blog</SoftTypography>
            <form onSubmit={handleSubmit}>
              {/* Image URL Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography>Image URL:</SoftTypography>
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
                  <SoftTypography>Title:</SoftTypography>
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
                  <SoftTypography>Content:</SoftTypography>
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
                  <SoftTypography>Publish Date:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <SoftTypography>{today.toLocaleDateString()}</SoftTypography>
                </Grid>
              </Grid>
              {/* Category Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography>Category:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    select
                    name="categoryId"
                    value={selectedCategory}
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
                <SoftBox display="flex" justifyContent="center" alignItems="center" p={3}>
                  <SoftButton type="submit" variant="contained" color="info">
                    Save
                  </SoftButton>
                </SoftBox>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

BlogAddForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default BlogAddForm;
