import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Footer from 'examples/Footer';
import Header from 'layouts/profile/components/Header';
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard';
import SoftBox from 'components/SoftBox';
import axios from 'axios';
import Cookies from 'js-cookie';

function Overview() {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    role: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = Cookies.get('authToken'); // Use get() method instead of getItem()
        if (!authToken) {
          console.log('No authToken found, redirect or handle accordingly');
          return;
        }

        const response = await axios.get('http://localhost:8080/user/info', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const userData = response.data; // Assuming response.data contains user info
        setUserInfo({
          fullName: userData.fullName,
          role: userData.role,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
        });
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []); // Empty dependency array ensures it only runs once on component mount

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}></Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="Profile Information"
              info={{
                fullName: userInfo.fullName,
                role: userInfo.role,
                email: userInfo.email,
                mobile: userInfo.phone,
                location: userInfo.address,
              }}
              action={{ route: '', tooltip: 'Edit Profile' }}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
