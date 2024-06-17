// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SoftTypography from 'components/SoftTypography';
// import { useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const ProductsTable = ({ searchValue }) => {
//   const [rows, setRows] = useState([]);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   fetchProducts();
//   // }, []);

//   useEffect(() => {
//     fetchProducts(searchValue);
//   }, [searchValue]);

//   // const fetchProducts = () => {
//   //   axios.get('http://localhost:8080/product/all')
//   const fetchProducts = (searchValue) => {
//     let url = 'http://localhost:8080/product/all';
//     if (searchValue) {
//       url = `http://localhost:8080/product/search?productName=${searchValue}`;
//     }

//     axios.get(url)
//       .then(response => {
//         const dataFromAPI = response.data;

//         const formattedData = dataFromAPI.map(product => ({
//           productId: product.productId.toString(),
//           // brandName: product.brandName[0],
//           productName: product.productName,
//           // categoryName: product.categoryName[0],
//           price: (
//             <SoftTypography variant="button" color="text" fontWeight="medium">
//               {product.price.toLocaleString('vi-VN')}
//             </SoftTypography>
//           ),
//           stock: (
//             <SoftTypography variant="caption" color="text" fontWeight="medium">
//               {product.stock}
//             </SoftTypography>
//           ),
//           action: (
//             <>
//               <IconButton onClick={() => handleEditClick(product.productId)}>
//                 <EditIcon />
//               </IconButton>
//               <IconButton onClick={() => handleDeleteClick(product.productId)}>
//                 <DeleteIcon />
//               </IconButton>
//             </>
//           ),
//         }));

//         setRows(formattedData);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   const handleEditClick = (productId) => {
//     navigate(`/products/${productId}`);
//   };

//   const handleDeleteClick = (productId) => {
//     const isConfirmed = window.confirm(`Are you sure you want to delete product ID: ${productId} ?`);
//     if (isConfirmed) {
//       axios.delete(`http://localhost:8080/product/delete/${productId}`)
//         .then(response => {
//           alert(response.data);
//           fetchProducts(); // Refresh the product list after deletion
//         })
//         .catch(error => {
//           alert("Cannot Delete Product!!!")
//           console.error('Error deleting product:', error);
//         });
//     }
//   };

//   return rows;
// };

// export default ProductsTable;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SoftTypography from 'components/SoftTypography';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductsTable = ({ searchValue }) => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(searchValue);
  }, [searchValue]);

  const fetchProducts = (searchValue) => {
    let url = 'http://localhost:8080/product/all';
    if (searchValue) {
      url = `http://localhost:8080/product/search?productName=${searchValue}`;
    }

    axios.get(url)
      .then(response => {
        const dataFromAPI = response.data;
        const promises = dataFromAPI.map(product => fetchBrandAndCategory(product));
        
        Promise.all(promises).then(formattedData => {
          setRows(formattedData);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchBrandAndCategory = async (product) => {
    try {
      const brandResponse = await axios.get(`http://localhost:8080/brand/getByProductId/${product.productId}`);
      const categoryResponse = await axios.get(`http://localhost:8080/category/getByProductId/${product.productId}`);
      
      return {
        productId: product.productId.toString(),
        productName: product.productName,
        brandName: brandResponse.data.brandName,
        categoryName: categoryResponse.data.categoryName,
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
            <IconButton onClick={() => handleDeleteClick(product.productId)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
      };
    } catch (error) {
      console.error(`Error fetching brand or category for product ID: ${product.productId}`, error);
      return {
        ...product,
        brandName: 'Unknown',
        categoryName: 'Unknown',
      };
    }
  };

  const handleEditClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleDeleteClick = (productId) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete product ID: ${productId}?`);
    if (isConfirmed) {
      axios.delete(`http://localhost:8080/product/delete/${productId}`)
        .then(response => {
          alert(response.data);
          fetchProducts(); // Refresh the product list after deletion
        })
        .catch(error => {
          alert("Cannot Delete Product!!!");
          console.error('Error deleting product:', error);
        });
    }
  };

  return rows;
};

export default ProductsTable;
