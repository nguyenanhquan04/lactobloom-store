import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { Grid, Paper, TextField, Typography, Box, MenuItem, Select } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderViewForm = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    shippingFee: "",
    status: false,
    orderDate: "",
  });
  const [statusChanged, setStatusChanged] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(`http://localhost:8080/order/get/${orderId}`);
        const orderData = orderResponse.data;

        setOrder({
          fullName: orderData.fullName,
          email: orderData.email,
          phone: orderData.phone,
          address: orderData.address,
          note: orderData.note,
          shippingFee: orderData.shippingFee,
          status: orderData.status,
          orderDate: orderData.orderDate,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [orderId]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value === "true";
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: newStatus,
    }));
    setStatusChanged(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/order/update/${orderId}`, { status: order.status });
      toast.success("Status updated successfully");
      setTimeout(() => {
        navigate("/orders");
      }, 2000); // Navigate to orders table after a short delay
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <ToastContainer />
      <SoftBox py={3}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper elevation={3} style={styles.form}>
              <Typography variant="h3" gutterBottom>
                View Order
              </Typography>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography variant="h6">Full Name:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="fullName"
                    value={order.fullName}
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
                  <SoftTypography variant="h6">Email:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="email"
                    value={order.email}
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
                  <SoftTypography variant="h6">Phone:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="phone"
                    value={order.phone}
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
                  <SoftTypography variant="h6">Address:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="address"
                    value={order.address}
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
                  <SoftTypography variant="h6">Note:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="note"
                    value={order.note}
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
                  <SoftTypography variant="h6">Shipping Fee:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="shippingFee"
                    value={order.shippingFee}
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
                  <SoftTypography variant="h6">Status:</SoftTypography>
                </Grid>
                <Grid item xs={8} display="flex" alignItems="center">
                  <Select
                    name="status"
                    value={order.status.toString()}
                    onChange={handleStatusChange}
                    fullWidth
                    required
                    margin="normal"
                  >
                    <MenuItem value="true">Delivered</MenuItem>
                    <MenuItem value="false">Undelivered</MenuItem>
                  </Select>
                  {statusChanged && (
                    <SoftButton
                      variant="contained"
                      color="info"
                      onClick={handleSave}
                      style={{ marginLeft: "10px" }}
                    >
                      Save
                    </SoftButton>
                  )}
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography variant="h6">Order Date:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="orderDate"
                    value={order.orderDate}
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
                <SoftButton
                  variant="contained"
                  color="info"
                  onClick={() => navigate("/orders")}
                >
                  Back
                </SoftButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </>
  );
};

const styles = {
  form: {
    padding: "30px",
  },
};

export default OrderViewForm;
