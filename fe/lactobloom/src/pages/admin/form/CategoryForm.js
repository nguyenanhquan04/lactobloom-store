import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, TextField, Grid
} from '@mui/material';
import Cookies from 'js-cookie';

const CategoryForm = ({ onSave, initialCategory }) => {
  const [category, setCategory] = useState({
    categoryName: ''
  });

  useEffect(() => {
    if (initialCategory) {
      setCategory({
        categoryName: initialCategory.categoryName
      });
    }
  }, [initialCategory]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory({
      ...category,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get('authToken');
    const url = initialCategory 
      ? `http://localhost:8080/category/update/${initialCategory.categoryId}`
      : `http://localhost:8080/category/save`;
    
    try {
      if (initialCategory) {
        await axios.put(url, category, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(url, category, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="categoryName"
            label="Category Name"
            variant="outlined"
            fullWidth
            value={category.categoryName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {initialCategory ? 'Update Category' : 'Add Category'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;
