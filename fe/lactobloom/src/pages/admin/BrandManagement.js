import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  TextField, IconButton, TablePagination, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from "js-cookie";

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:8080/brand/all');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDelete = async (brandId) => {
    const token = Cookies.get("authToken");
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await axios.delete(`http://localhost:8080/brand/delete/${brandId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBrands(brands.filter(brand => brand.brandId !== brandId));
      } catch (error) {
        console.error('Error deleting brand:', error);
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

  const filteredBrands = brands.filter(brand =>
    brand.brandName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const paginatedBrands = filteredBrands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="brand-management-container">
      <h1>Brands Management</h1>
      <Grid container spacing={0} alignItems="center" className="brand-management-controls">
        <Grid item xs={12} md={9}>
          <TextField
            label="Search Brands"
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
            className="brand-management-add-button"
          >
            Add New Brand
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className="brand-management-table-container">
        <Table className="brand-management-table">
          <TableHead>
            <TableRow>
              <TableCell className="brand-management-id-cell">ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell className="actions-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBrands.map((brand) => (
              <TableRow key={brand.brandId}>
                <TableCell className="brand-management-id-cell">{brand.brandId}</TableCell>
                <TableCell>{brand.brandName}</TableCell>
                <TableCell className="brand-management-actions">
                  <IconButton onClick={() => {/* Navigate to edit page */}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(brand.brandId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredBrands.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[15, 30, 50]}
          className="brand-management-pagination"
        />
      </TableContainer>
    </div>
  );
};

export default BrandManagement;
