import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BrandEditForm = ({ onSave }) => {
  const { brandId } = useParams(); // Get brandId from URL
  const navigate = useNavigate();
  const [brand, setBrand] = useState({
    brandId: '',
    brandName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`http://localhost:8080/brand/get/${brandId}`);
        const response = await axios.get(`http://localhost:8080/brand/get/${brandId}`);
        setBrand(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };
  
    fetchData();
  }, [brandId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/brand/update/${brandId}`, brand);
      toast.success('Brand updated successfully!');
      onSave(brand); // Handle the success scenario
      setTimeout(() => {
        navigate('/brands'); // Navigate to the brand table after a short delay
      }, 2000);
    } catch (error) {
      console.error('Error updating brand:', error);
      toast.error('Error updating brand.');
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
            <Typography variant="h3" gutterBottom>Edit Brand</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Brand ID:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
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
                  <Typography variant="h6">Brand Name:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="brandName"
                    value={brand.brandName}
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

BrandEditForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default BrandEditForm;




