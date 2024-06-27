import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; // Import Cookies for token management

const CategoryEditForm = ({ onSave }) => {
  const { categoryId } = useParams(); // Get categoryId from URL params
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    categoryId: '',
    categoryName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get('authToken'); // Retrieve auth token from cookies
        const headers = {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(`http://localhost:8080/category/get/${categoryId}`, { headers });
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = Cookies.get('authToken'); // Retrieve auth token from cookies
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.put(`http://localhost:8080/category/update/${categoryId}`, category, { headers });
      toast.success('Category updated successfully!');
      onSave(); // Handle the success scenario
      setTimeout(() => {
        navigate('/categories'); // Navigate to the category table after a short delay
      }, 2000);
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Error updating category.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  return (
    <>
      <ToastContainer />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} style={styles.form}>
            <Typography variant="h3" gutterBottom>Edit Category</Typography>
            <form onSubmit={handleSubmit}>
              {/* Category ID Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Category ID:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
                    name="categoryId"
                    value={category.categoryId}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                    disabled // Disable input field for Category ID as it should not be editable
                  />
                </Grid>
              </Grid>
              {/* Category Name Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Category Name:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="categoryName"
                    value={category.categoryName}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
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

CategoryEditForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default CategoryEditForm;
