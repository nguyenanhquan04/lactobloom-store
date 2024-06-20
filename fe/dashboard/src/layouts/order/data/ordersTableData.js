import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SoftTypography from 'components/SoftTypography';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Cookies from 'js-cookie';

const OrdersTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken"); 
    if (!authToken) {
      navigate('/authentication/login'); // Redirect to login if authToken is missing
      return;
    }
    fetchOrders(authToken);
  }, [navigate]);

  const fetchOrders = (authToken) => {
    axios.get('http://localhost:8080/order/all', {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the bearer token in the headers
      },
    })
    .then((response) => {
      const formattedData = response.data.map(order => ({
        orderId: order.orderId.toString(),
        customerName: order.fullName,
        totalPrice: (
          <SoftTypography variant="button" color="text" fontWeight="medium">
            {order.totalPrice.toLocaleString('vi-VN')}
          </SoftTypography>
        ),
        status: order.status ? 'Delivered' : 'Undelivered', // Assuming status is boolean
        action: (
          <IconButton onClick={() => handleViewClick(order.orderId)}>
            <VisibilityIcon />
          </IconButton>
        ),
      }));
      setRows(formattedData);
    })
    .catch((error) => {
      console.error('Error fetching orders:', error);
      // Handle error, such as showing an error message to the user
    });
  };

  const handleViewClick = (orderId) => {
    navigate(`/orders/view/${orderId}`);
  };

  return rows;
};

export default OrdersTable;
