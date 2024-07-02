import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import BlogAddForm from './form';
import SoftBox from 'components/SoftBox';
import { Card, Typography } from '@mui/material';

const AddBlog = () => {
  const navigate = useNavigate();

  const handleSave = (newBlog) => {
    console.log('New blog added:', newBlog);
    // Handle save logic here, such as sending the new blog to a server
  };

  useEffect(() => {
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      navigate('/authentication/login');
    }

    try {
      const decodedToken = jwtDecode(authToken);
      const currentTime = Date.now() / 1000;

      // Check if the token is expired
      if (decodedToken.exp < currentTime) {
        Cookies.remove('authToken');
        navigate('/authentication/login');
      }
    } catch (e) {
      // If token is invalid, remove it and redirect to login
      Cookies.remove('authToken');
      navigate('/authentication/login');
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={5}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <Typography variant="h6">Add Blog</Typography>
            </SoftBox>
            <SoftBox p={3}>
              <BlogAddForm onSave={handleSave} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default AddBlog;
