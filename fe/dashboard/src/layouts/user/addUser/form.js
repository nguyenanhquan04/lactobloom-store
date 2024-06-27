import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Box, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UserAddForm = ({ onSave }) => {
  const [user, setUser] = useState({
    fullName: '',
    role: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = Cookies.get('authToken');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post('http://localhost:8080/user/save', user, { headers });
      toast.success('User added successfully!');
      onSave(); // Refresh user table
      setTimeout(() => {
        navigate('/users'); // Navigate to the user table after a short delay
      }, 2000);
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error adding user.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <ToastContainer />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} style={styles.form}>
            <SoftTypography variant="h6" gutterBottom>Add New User</SoftTypography>
            <form onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography>Full Name:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Role Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography>Role:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="role"
                    value={user.role}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                    select
                  >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="STAFF">STAFF</MenuItem>
                    <MenuItem value="MEMBER">MEMBER</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              {/* Email Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography>Email:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Password Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography>Password:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                    type="password"
                  />
                </Grid>
              </Grid>
              {/* Phone Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography>Phone:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Address Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SoftTypography>Address:</SoftTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Save Button */}
              <Box mt={2}>
                <SoftBox display="flex" justifyContent="center" alignItems="center" p={3}>
                  <SoftButton type="submit" variant="contained" color="info">
                    Save
                  </SoftButton>
                </SoftBox>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

UserAddForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default UserAddForm;
