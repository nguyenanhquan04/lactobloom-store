import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SoftTypography from 'components/SoftTypography';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductsTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/product/all')
      .then(response => {
        const dataFromAPI = response.data;

        const formattedData = dataFromAPI.map(product => ({
          productId: product.productId.toString(),
          brandName: product.brandName[0],
          productName: product.productName,
          categoryName: product.categoryName[0],
          price: (
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {product.price.toLocaleString('vi-VN')}
            </SoftTypography>
          ),
          stock: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              {product.stock}
            </SoftTypography>
          ),
          action: (
            <>
              <IconButton onClick={() => handleEditClick(product.productId)}>
                <EditIcon />
              </IconButton>
              <IconButton>
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
  }, []);

  const handleEditClick = (productId) => {
    navigate(`/products/${productId}?productId=${productId}`)
  };

  return rows;
};

export default ProductsTable;
