import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SoftTypography from 'components/SoftTypography';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Cookies from 'js-cookie';

const UsersTable = ({ searchValue }) => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(searchValue);
  }, [searchValue]);

  const fetchUsers = (searchValue) => {
    const authToken = Cookies.get("authToken"); // Retrieve the authToken from cookies

    let url = 'http://localhost:8080/user/all';
    if (searchValue) {
      url = `http://localhost:8080/user/search?fullName=${searchValue}`;
    }

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the bearer token in the headers
      },
    })
      .then(response => {
        const dataFromAPI = response.data;
        const formattedData = dataFromAPI.map(user => ({
          userId: user.userId.toString(),
          fullName: user.fullName,
          role: user.role,
          email: user.email,
          password: user.password,
          phone: user.phone,
          address: user.address,
          point: user.point,
          action: (
            <>
              {/* <IconButton onClick={() => handleViewClick(user.userId)}>
                <VisibilityIcon />
              </IconButton> */}
              <IconButton onClick={() => handleEditClick(user.userId)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteClick(user.userId)}>
                <DeleteIcon />
              </IconButton>
            </>
          ),
        }));
        setRows(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // const handleViewClick = (userId) => {
  //   navigate(`/users/view/${userId}`);
  // };

  const handleEditClick = (userId) => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDeleteClick = (userId) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete user ID: ${userId}?`);
    if (isConfirmed) {
      axios.delete(`http://localhost:8080/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
        .then(response => {
          alert(response.data);
          fetchUsers(); // Refresh the user list after deletion
        })
        .catch(error => {
          alert("Cannot Delete User!!!");
          console.error('Error deleting user:', error);
        });
    }
  };

  return rows;
};

export default UsersTable;
