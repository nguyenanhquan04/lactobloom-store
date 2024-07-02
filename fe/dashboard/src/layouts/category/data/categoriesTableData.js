import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoriesTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/category/all')
      .then(response => {
        const dataFromAPI = response.data;

        const formattedData = dataFromAPI.map(category => ({
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          action: (
            <>
              <IconButton onClick={() => handleEditClick(category.categoryId)}>
                <EditIcon />
              </IconButton>
              {/* <IconButton onClick={() => handleDeleteClick(category.categoryId)}>
                <DeleteIcon />
              </IconButton> */}
            </>
          ),
        }));

        setRows(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleEditClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleDeleteClick = (categoryId) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete category ID: ${categoryId} ?`);
    if (isConfirmed) {
      axios.delete(`http://localhost:8080/category/delete/${categoryId}`)
        .then(response => {
          alert(response.data);
          fetchProducts(); // Refresh the product list after deletion
        })
        .catch(error => {
          alert("Cannot Delete category!!!")
          console.error('Error deleting category:', error);
        });
    }
  };

  return rows;
};

export default CategoriesTable;
