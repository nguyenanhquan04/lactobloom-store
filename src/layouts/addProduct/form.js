import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftBox from 'components/SoftBox';
import SoftInput from 'components/SoftInput';

const ProductAddForm = ({ onSave }) => {
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    brandName: '',
    categoryName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/product/add', product);
      alert(response.data); // Display success message
      onSave(); // Refresh product table
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} style={styles.form}>
          <Typography variant="h6" gutterBottom>Add New Product</Typography>
          <form onSubmit={handleSubmit}>
            {/* Product Name Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Product Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <SoftInput
                  value={product.productName}
                  onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Brand Name Field */}
            {/* Replace the TextField with a Select component if you want to select from existing brands */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Brand Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.brandName}
                  onChange={(e) => setProduct({ ...product, brandName: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Category Name Field */}
            {/* Replace the TextField with a Select component if you want to select from existing categories */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Category Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.categoryName}
                  onChange={(e) => setProduct({ ...product, categoryName: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Description Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Description:</Typography>
              </Grid>
              <Grid item xs={8}>
                <SoftInput
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Price Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Price:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Stock Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Stock:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Discount Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Discount (%):</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.discount}
                  onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                  fullWidth
                  required
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
  );
};

ProductAddForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
    form: {
        padding: '30px',
      },
    };
    
    export default ProductAddForm;
    