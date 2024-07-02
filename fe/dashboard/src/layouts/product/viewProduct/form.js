import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { Grid, Paper, TextField, Typography, Box } from "@mui/material";
import SoftInput from "components/SoftInput";
import SoftInputIconBoxRoot from "components/SoftInput/SoftInputIconBoxRoot";

const ProductViewForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    brandName: "",
    categoryName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:8080/product/get/${productId}`);
        const productData = productResponse.data;

        const categoryResponse = await axios.get(
          `http://localhost:8080/category/getByProductId/${productId}`
        );
        const categoryData = categoryResponse.data;

        const brandResponse = await axios.get(
          `http://localhost:8080/brand/getByProductId/${productId}`
        );
        const brandData = brandResponse.data;

        setProduct({
          ...productData,
          brandName: brandData.brandName,
          categoryName: categoryData.categoryName,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} style={styles.form}>
          <Typography variant="h3" gutterBottom>
            View Product
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <SoftTypography variant="h6">Product Name:</SoftTypography>
            </Grid>
            <Grid item xs={8}>
              <SoftInput
                name="productName"
                value={product.productName}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Brand Name:</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="brandName"
                value={product.brandName || ""}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Category Name:</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="categoryName"
                value={product.categoryName || ""}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <SoftTypography variant="h6">Description:</SoftTypography>
            </Grid>
            <Grid item xs={8}>
              <SoftInput
                name="description"
                value={product.description}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Price:</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="price"
                value={product.price}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Stock:</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="stock"
                value={product.stock}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Discount (%):</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="discount"
                value={product.discount}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <SoftButton variant="contained" color="info" onClick={() => navigate("/products")}>
              Back
            </SoftButton>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const styles = {
  form: {
    padding: "30px",
  },
};

export default ProductViewForm;
