import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const BlogsTable = ({ searchValue }) => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs(searchValue); // Fetch blogs when component mounts or searchValue changes
  }, [searchValue]);

  const fetchBlogs = async (searchValue) => {
    try {
      const authToken = Cookies.get('authToken');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      let url = 'http://localhost:8080/blog/all';
      if (searchValue) {
        url = `http://localhost:8080/blog/search?title=${searchValue}`;
      }

      const response = await axios.get(url, { headers });
      const blogs = response.data;

      const formattedData = blogs.map(blog => ({
        blogId: blog.blogId.toString(),
        title: blog.title,
        publishDate: new Date(blog.publishDate).toLocaleString(),
        action: (
          <>
            <IconButton onClick={() => handleEditClick(blog.blogId)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(blog.blogId)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
      }));

      setRows(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (blogId) => {
    navigate(`/blogs/edit/${blogId}`);
  };

  const handleDeleteClick = (blogId) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete blog ID: ${blogId}?`);
    if (isConfirmed) {
      axios
        .delete(`http://localhost:8080/blog/delete/${blogId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        })
        .then((response) => {
          alert(response.data);
          fetchBlogs(); // Refresh the blog list after deletion
        })
        .catch((error) => {
          alert('Cannot Delete Blog!!!');
          console.error('Error deleting blog:', error);
        });
    }
  };

  return rows;
};

export default BlogsTable;
