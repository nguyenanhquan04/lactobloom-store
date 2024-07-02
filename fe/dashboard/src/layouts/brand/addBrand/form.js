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

const BrandAddForm = ({ onSave }) => {
  const [brand, setBrand] = useState({
    brandId: '',
    brandName: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/brand/save', brand);
      toast.success('Brand added successfully!');
      onSave(); // Refresh brand table
      setTimeout(() => {
        navigate('/brands'); // Navigate to the brand table after a short delay
      }, 2000);
    } catch (error) {
      console.error('Error adding brand:', error);
      toast.error('Error adding brand.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrand({
      ...brand,
      [name]: value,
    });
  };

  return (
    <>
      <ToastContainer />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} style={styles.form}>
            <Typography variant="h6" gutterBottom>Add New Brand</Typography>
            <form onSubmit={handleSubmit}>
              {/* Brand ID Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography>Brand ID:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="brandId"
                    value={brand.brandId}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Brand Name Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography>Brand Name:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
                    name="brandName"
                    value={brand.brandName}
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

BrandAddForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default BrandAddForm;
