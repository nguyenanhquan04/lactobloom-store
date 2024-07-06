import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  IconButton, TablePagination, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from "js-cookie";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = Cookies.get("authToken");
      try {
        const response = await axios.get('http://localhost:8080/order/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Sort orders by orderDate in descending order
        const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    const token = Cookies.get("authToken");
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:8080/order/delete/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(orders.filter(order => order.orderId !== orderId));
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setPage(0);
  };

  const filteredOrders = orders.filter(order => {
    if (selectedStatus === 'all') return true;
    if (selectedStatus === 'completed') return order.status === true;
    if (selectedStatus === 'pending') return order.status === false;
    return false;
  });

  const paginatedOrders = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="order-management-container">
      <h1>Order Management</h1>
      <Grid container spacing={0} alignItems="center" className="order-management-controls">
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="all">All Orders</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className="order-management-add-button"
          >
            Add New Order
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className="order-management-table-container">
        <Table className="order-management-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.fullName}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.status ? 'Completed' : 'Pending'}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell className="order-management-actions">
                  <IconButton onClick={() => {/* Navigate to edit page */}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(order.orderId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[15, 30, 50]}
          className="order-management-pagination"
        />
      </TableContainer>
    </div>
  );
};

export default OrderManagement;