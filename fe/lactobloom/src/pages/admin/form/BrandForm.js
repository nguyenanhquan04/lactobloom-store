import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, TextField, Grid
} from '@mui/material';
import Cookies from 'js-cookie';

const BrandForm = ({ onSave, initialBrand }) => {
  const [brand, setBrand] = useState({
    brandName: ''
  });

  useEffect(() => {
    if (initialBrand) {
      setBrand({
        brandName: initialBrand.brandName
      });
    }
  }, [initialBrand]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBrand({
      ...brand,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get('authToken');
    const url = initialBrand 
      ? `http://localhost:8080/brand/update/${initialBrand.brandId}`
      : `http://localhost:8080/brand/save`;
    
    try {
      if (initialBrand) {
        await axios.put(url, brand, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(url, brand, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving brand:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="brandName"
            label="Brand Name"
            variant="outlined"
            fullWidth
            value={brand.brandName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {initialBrand ? 'Update Brand' : 'Add Brand'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BrandForm;
