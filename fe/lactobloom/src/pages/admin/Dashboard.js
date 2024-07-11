import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Box,
  IconButton
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { Menu as MenuIcon } from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);
  const [salesByMonth, setSalesByMonth] = useState([]);
  const [salesByDate, setSalesByDate] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [months, setMonths] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchTopSellingProducts();
    fetchRecentOrders();
    fetchRevenueData();
    fetchSalesData();
    fetchAvailableMonths();
  }, []);

  useEffect(() => {
    fetchSalesByDate();
  }, [selectedMonth]);

  const fetchTopSellingProducts = async () => {
    const token = Cookies.get('authToken');
    try {
      const response = await axios.get('http://localhost:8080/dashboard/top5SellingProducts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const products = response.data;
      
      const productDetailsPromises = products.map(async (product) => {
        const productResponse = await axios.get(`http://localhost:8080/product/get/${product.productId}`);
        return {
          productId: product.productId,
          totalMoney: product.totalMoney,
          productName: productResponse.data.productName
        };
      });

      const productDetails = await Promise.all(productDetailsPromises);
      setTopSellingProducts(productDetails);
    } catch (error) {
      console.error('Error fetching top selling products:', error);
    }
  };

  const fetchRecentOrders = async () => {
    const token = Cookies.get('authToken');
    try {
      const response = await axios.get('http://localhost:8080/dashboard/top5RecentOrders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orders = response.data.map(order => ({
        id: order.orderId,
        customer: order.fullName,
        date: order.orderDate.split('T')[0],
        total: order.totalPrice
      }));
      setRecentOrders(orders);
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    }
  };

  const fetchRevenueData = async () => {
    const token = Cookies.get('authToken');
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth() is zero-based
    const year = now.getFullYear();
  
    try {
      const totalRevenueResponse = await axios.get('http://localhost:8080/dashboard/totalRevenue', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalRevenue(parseFloat(totalRevenueResponse.data));
  
      const todayRevenueResponse = await axios.get('http://localhost:8080/dashboard/todayRevenue', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodayRevenue(parseFloat(todayRevenueResponse.data));
  
      const monthRevenueResponse = await axios.get(`http://localhost:8080/dashboard/monthRevenue?month=${month}&year=${year}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMonthRevenue(parseFloat(monthRevenueResponse.data));
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  const fetchSalesData = async () => {
    const token = Cookies.get('authToken');
    try {
      const year = new Date().getFullYear();
      const response = await axios.get(`http://localhost:8080/dashboard/salesByMonthOfYear?year=${year}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const salesData = response.data.map(item => ({
        month: item.month,
        doanhThu: parseFloat(item.revenue) / 1000000, // Adjust revenue scale here
        orderCounts: item.orderCounts
      }));
      setSalesByMonth(salesData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const fetchAvailableMonths = async () => {
    const token = Cookies.get('authToken');
    try {
      const response = await axios.get('http://localhost:8080/dashboard/availableMonths', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMonths(response.data); // Assume the response is an array of months (e.g., ["01", "02", "03", ..., "12"])
    } catch (error) {
      console.error('Error fetching available months:', error);
    }
  };

  const fetchSalesByDate = async () => {
    const token = Cookies.get('authToken');
    try {
      const year = new Date().getFullYear();
      const response = await axios.get(`http://localhost:8080/dashboard/salesByDayOfMonth?month=${selectedMonth}&year=${year}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const salesDateData = response.data.map(item => ({
        date: item.date,
        revenue: parseFloat(item.revenue) / 1000000, // Adjust revenue scale here
        orderCounts: item.orderCounts
      }));
      setSalesByDate(salesDateData);
    } catch (error) {
      console.error('Error fetching sales by date:', error);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <IconButton onClick={toggleDrawer} sx={{ display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Revenue
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" height={150}>
                  <Typography variant="h4">
                    {totalRevenue.toLocaleString("vi-VN")} VND
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Today Revenue
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" height={150}>
                  <Typography variant="h4">
                    {todayRevenue.toLocaleString("vi-VN")} VND
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Month Revenue
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" height={150}>
                  <Typography variant="h4">
                    {monthRevenue.toLocaleString("vi-VN")} VND
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={7}>
            <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Doanh Thu Năm Nay
                </Typography>
                <BarChart width={600} height={300} data={salesByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Doanh thu (triệu)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value, name) => name === 'revenue' ? (value*1000000).toLocaleString("vi-VN") + " VND" : value} />
                  <Legend />
                  <Bar dataKey="doanhThu" fill="#8884d8" />
                  <Bar dataKey="orderCounts" fill="#82ca9d" />
                </BarChart>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={7}>
            <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Doanh Thu Tháng Này
                </Typography>
                <LineChart width={600} height={300} data={salesByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis label={{ value: 'Revenue (millions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value, name) => name === 'revenue' ? (value*1000000).toLocaleString("vi-VN") + " VND" : value} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  <Line type="monotone" dataKey="orderCounts" stroke="#82ca9d" />
                </LineChart>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Selling Products
                </Typography>
                <List>
                  {topSellingProducts.map((product) => (
                    <ListItem key={product.productId}>
                      <ListItemText
                        primary={product.productName}
                        secondary={`Total Sales: ${product.totalMoney.toLocaleString("vi-VN")} VND`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Orders
                </Typography>
                <List>
                  {recentOrders.map((order) => (
                    <ListItem key={order.id}>
                      <ListItemText
                        primary={`Order ID: ${order.id}`}
                        secondary={`Customer: ${order.customer} | Date: ${order.date} | Total: ${order.total.toLocaleString("vi-VN")} VND`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
