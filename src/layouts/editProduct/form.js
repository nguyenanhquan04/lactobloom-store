import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Button, MenuItem, Select, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';

const ProductEditForm = ({ onSave }) => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState({
    productId: '',
    productName: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    brandName: [],
    categoryName: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`http://localhost:8080/product/get/${productId}`);
        const response = await axios.get(`http://localhost:8080/product/get/${productId}`);
        setProduct(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    fetchData();
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} style={styles.form}>
          <Typography variant="h6" gutterBottom>Edit Product</Typography>
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
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Brand Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.brandName[0]} // Lấy giá trị đầu tiên trong mảng
                  onChange={(e) => setProduct({ ...product, brandName: [e.target.value] })}
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
                <TextField
                  value={product.categoryName[0]} // Lấy giá trị đầu tiên trong mảng
                  onChange={(e) => setProduct({ ...product, categoryName: [e.target.value] })}
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
              <SoftButton type="submit" variant="contained" color="info">
              Save
              </SoftButton>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

ProductEditForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default ProductEditForm;
