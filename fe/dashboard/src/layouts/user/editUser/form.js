import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Typography, Box, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const UserEditForm = ({ onSave }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
    point: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = Cookies.get('authToken');

        const response = await axios.get(`http://localhost:8080/user/get/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = Cookies.get('authToken');

      const response = await axios.put(`http://localhost:8080/user/update/${userId}`, user, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('User updated successfully:', response.data);
      toast.success('User updated successfully!');
      onSave(user);
      setTimeout(() => {
        navigate('/users');
      }, 1000);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user.');
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
            <Typography variant="h3" gutterBottom>
              Edit User
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Full Name:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Email Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Email:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
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
                  <Typography variant="h6">Password:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    fullWidth
                    type="password"
                    margin="normal"
                  />
                </Grid>
              </Grid>
              {/* Phone Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Phone:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
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
                  <Typography variant="h6">Address:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
                    name="address"
                    value={user.address}
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
                  <Typography variant="h6">Role:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="role"
                    select
                    value={user.role || ''}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    margin="normal"
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              {/* Point Field */}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6">Point:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <SoftInput
                    name="point"
                    value={user.point}
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

UserEditForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default UserEditForm;
