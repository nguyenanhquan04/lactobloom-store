import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import Cookies from 'js-cookie';

const OrderForm = ({ onSave, initialOrder }) => {
  const [order, setOrder] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    note: '',
    shippingFee: '',
    totalPrice: '',
    status: false,
    orderDate: ''
  });
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    if (initialOrder) {
      setOrder(initialOrder);
      fetchOrderDetails(initialOrder.orderId);
    }
  }, [initialOrder]);

  const fetchOrderDetails = async (orderId) => {
    const token = Cookies.get('authToken');
    try {
      const response = await axios.get(`http://localhost:8080/order-detail/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder({
      ...order,
      [name]: value
    });
  };

  const handleStatusChange = (event) => {
    setOrder({
      ...order,
      status: event.target.value === 'Completed'
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get('authToken');
    const url = `http://localhost:8080/order/update/${order.orderId}`;
    
    try {
      await axios.put(url, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="fullName"
            label="Full Name"
            variant="outlined"
            fullWidth
            value={order.fullName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={order.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone"
            label="Phone"
            variant="outlined"
            fullWidth
            type="tel"
            value={order.phone}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="Address"
            variant="outlined"
            fullWidth
            value={order.address}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="note"
            label="Note"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={order.note}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="shippingFee"
            label="Shipping Fee"
            variant="outlined"
            fullWidth
            type="number"
            value={order.shippingFee}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="totalPrice"
            label="Total Price"
            variant="outlined"
            fullWidth
            type="number"
            value={order.totalPrice}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={order.status ? 'Completed' : 'Pending'}
              onChange={handleStatusChange}
              label="Status"
              required
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="orderDate"
            label="Order Date"
            variant="outlined"
            fullWidth
            type="datetime-local"
            value={order.orderDate}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Grid>
        {orderDetails.length > 0 && (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails.map((detail) => (
                    <TableRow key={detail.orderDetailId}>
                      <TableCell>{detail.productName}</TableCell>
                      <TableCell>{detail.quantity}</TableCell>
                      <TableCell>{detail.totalPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Update Order
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderForm;
