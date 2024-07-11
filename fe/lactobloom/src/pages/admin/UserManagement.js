import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  TextField, IconButton, TablePagination, MenuItem, Select, FormControl, InputLabel, Grid, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import UserForm from './form/UserForm'; // Import the UserForm component

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [selectedRole, setSelectedRole] = useState('all');
  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false); // State to handle dialog open/close

  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get('authToken');
      try {
        const response = await axios.get('http://localhost:8080/user/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDelete = async (userId) => {
    const token = Cookies.get('authToken');
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8080/user/delete/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter(user => user.userId !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
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

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setPage(0);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  const handleSave = () => {
    // Fetch updated users after saving
    const fetchUsers = async () => {
      const token = Cookies.get('authToken');
      try {
        const response = await axios.get('http://localhost:8080/user/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    handleClose();
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const displayedUsers = selectedRole === 'all'
    ? filteredUsers
    : filteredUsers.filter(user => user.role === selectedRole);

  const paginatedUsers = displayedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <Grid container spacing={0} alignItems="center" className="user-management-controls">
        <Grid item xs={12} md={9}>
          <TextField
            label="Search Users"
            variant="outlined"
            value={searchValue}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <FormControl variant="outlined" fullWidth className="user-management-role-select">
        <InputLabel>Role</InputLabel>
        <Select
          value={selectedRole}
          onChange={handleRoleChange}
          label="Role"
        >
          <MenuItem value="all">All Users</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="STAFF">Staff</MenuItem>
          <MenuItem value="MEMBER">Member</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper} className="user-management-table-container">
        <Table className="user-management-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.point}</TableCell>
                <TableCell className="user-management-actions">
                  <IconButton onClick={() => handleEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.userId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={displayedUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[15, 30, 50]}
          className="user-management-pagination"
        />
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <UserForm onSave={handleSave} initialUser={editUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
