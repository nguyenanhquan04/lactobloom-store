import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  TextField, IconButton, TablePagination, MenuItem, Select, FormControl, InputLabel, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from "js-cookie";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/blog-category/all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/blog/all');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchCategories();
    fetchBlogs();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDelete = async (blogId) => {
    const token = Cookies.get("authToken");
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:8080/blog/delete/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(blogs.filter(blog => blog.blogId !== blogId));
      } catch (error) {
        console.error('Error deleting blog:', error);
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(0);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const displayedBlogs = selectedCategory === 'all'
    ? filteredBlogs
    : filteredBlogs.filter(blog => blog.blogCategoryName === selectedCategory);

  const paginatedBlogs = displayedBlogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="blog-management-container">
      <h1>Blogs Management</h1>
      <Grid container spacing={0} alignItems="center" className="blog-management-controls">
        <Grid item xs={12} md={9}>
          <TextField
            label="Search Blogs"
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
            className="blog-management-add-button"
          >
            Add New Blog
          </Button>
        </Grid>
      </Grid>
      <FormControl variant="outlined" fullWidth className="blog-management-category-select">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="all">All Blogs</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.blogCategoryId} value={category.blogCategoryName}>
              {category.blogCategoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper} className="blog-management-table-container">
        <Table className="blog-management-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBlogs.map((blog) => (
              <TableRow key={blog.blogId}>
                <TableCell>{blog.blogId}</TableCell>
                <TableCell>{blog.blogCategoryName}</TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{new Date(blog.publishDate).toLocaleDateString()}</TableCell>
                <TableCell className="blog-management-actions">
                  <IconButton onClick={() => {/* Navigate to edit page */}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(blog.blogId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={displayedBlogs.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[15, 30, 50]}
          className="blog-management-pagination"
        />
      </TableContainer>
    </div>
  );
};

export default BlogManagement;