import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BrandTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = () => {
    axios.get('http://localhost:8080/brand/all')
      .then(response => {
        const dataFromAPI = response.data;

        const formattedData = dataFromAPI.map(brand => ({
          brandId: brand.brandId,
          brandName: brand.brandName,
          action: (
            <>
              <IconButton onClick={() => handleEditClick(brand.brandId)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteClick(brand.brandId)}>
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

  const handleEditClick = (brandId) => {
    navigate(`/brands/${brandId}`);
  };

  const handleDeleteClick = (brandId) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete brand ID: ${brandId} ?`);
    if (isConfirmed) {
      axios.delete(`http://localhost:8080/brand/delete/${brandId}`)
        .then(response => {
          alert(response.data);
          fetchBrands(); // Refresh the brand list after deletion
        })
        .catch(error => {
          console.error('Error deleting brand:', error);
          alert('Error deleting brand.');
        });
    }
  };

  return rows;
};

export default BrandTable;
