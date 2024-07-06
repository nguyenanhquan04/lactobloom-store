import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  TextField, IconButton, TablePagination, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from "js-cookie";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category/all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDelete = async (categoryId) => {
    const token = Cookies.get("authToken");
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:8080/category/delete/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(categories.filter(category => category.categoryId !== categoryId));
      } catch (error) {
        console.error('Error deleting category:', error);
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

  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="category-management-container">
      <h1>Categories Management</h1>
      <Grid container spacing={0} alignItems="center" className="category-management-controls">
        <Grid item xs={12} md={9}>
          <TextField
            label="Search Categories"
            variant="outlined"
            value={searchValue}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className="category-management-add-button"
          >
            Add New Category
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className="category-management-table-container">
        <Table className="category-management-table">
          <TableHead>
            <TableRow>
              <TableCell className="category-management-id-cell">ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell className="actions-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.map((category) => (
              <TableRow key={category.categoryId}>
                <TableCell className="category-management-id-cell">{category.categoryId}</TableCell>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell className="category-management-actions">
                  <IconButton onClick={() => {/* Navigate to edit page */}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(category.categoryId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredCategories.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[15, 30, 50]}
          className="category-management-pagination"
        />
      </TableContainer>
    </div>
  );
};

export default CategoryManagement;
