import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftBox from 'components/SoftBox';
import SoftInput from 'components/SoftInput';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CategoryAddForm = ({ onSave }) => {
  const [category, setCategory] = useState({
    categoryId: '',
    categoryName: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/category/save', category);
      toast.success('Category added successfully!');
      onSave(); // Refresh category table
      setTimeout(() => {
        navigate('/categories'); // Navigate to the category table after a short delay
      }, 2000);
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Error adding category.');
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
            <Typography variant="h6" gutterBottom>Add New Category</Typography>
            <form onSubmit={handleSubmit}>
              {/* Category ID Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography>Category ID:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="categoryId"
                    value={category.categoryId}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Category Name Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography>Category Name:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
                    name="categoryName"
                    value={category.categoryName}
                    onChange={handleInputChange}
                    fullWidth
                    rows={4}
                    margin="normal"
                  />
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

CategoryAddForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default CategoryAddForm;
