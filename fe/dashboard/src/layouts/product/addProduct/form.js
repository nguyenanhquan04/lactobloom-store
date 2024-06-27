import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Typography, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category/all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:8080/brand/all');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const brand = brands.find(b => b.brandName === product.brandName);
    const category = categories.find(c => c.categoryName === product.categoryName);
    if (brand && category) {
      try {
        const response = await axios.post(`http://localhost:8080/product/save/brand/${brand.brandId}/category/${category.categoryId}`, product);
        toast.success('Product added successfully!');
        onSave(); // Refresh product table
        setTimeout(() => {
          navigate('/products'); // Navigate to the product table after 1 seconds
        }, 1000);
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Error adding product.');
      }
    } else {
      console.error('Brand or Category not found');
      toast.error('Brand or Category not found.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <>
      <ToastContainer />
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
                    name="productName"
                    value={product.productName}
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
                  <TextField
                    name="brandName"
                    select
                    value={product.brandName}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand.brandId} value={brand.brandName}>
                        {brand.brandName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              {/* Category Name Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography>Category Name:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="categoryName"
                    select
                    value={product.categoryName}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.categoryId} value={cat.categoryName}>
                        {cat.categoryName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              {/* Description Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography>Description:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
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
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
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
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
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
                    name="discount"
                    value={product.discount}
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

ProductAddForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default ProductAddForm;
