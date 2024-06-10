// // form.js (or ProductEditForm.js)
// /* eslint-disable react/prop-types */
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Grid, Paper, TextField, Button, MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';

// const ProductEditForm = ({ product, onSave }) => {
//   // Initialize state variables
//   const [brandName, setBrandName] = useState(product?.brand || '');
//   const [productName, setProductName] = useState(product?.name || '');
//   const [categoryName, setCategoryName] = useState(product?.category || 'Electronics'); // Default category
//   const [price, setPrice] = useState(product?.price || '');
//   const [stock, setStock] = useState(product?.stock || '');
//   const [discount, setDiscount] = useState(product?.discount || 10); // Default discount

//   // Define product categories locally
//   const categories = ['Electronics', 'Books', 'Clothing', 'Home & Kitchen'];

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedProduct = {
//       brand: brandName,
//       name: productName,
//       category: categoryName,
//       price,
//       stock,
//       discount,
//     };
//     onSave(updatedProduct);
//   };

//   return (
//     <Grid container spacing={2} justifyContent="center">
//       <Grid item xs={12} md={8} lg={6}>
//         <Paper elevation={3} style={styles.form}>
//           <Typography variant="h6" gutterBottom>Edit Product</Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Brand Name"
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               fullWidth
//               required
//               margin="normal"
//             />
//             <TextField
//               label="Product Name"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               fullWidth
//               required
//               margin="normal"
//             />
//             <FormControl fullWidth required margin="normal">
//               <InputLabel>Category Name</InputLabel>
//               <Select
//                 value={categoryName}
//                 onChange={(e) => setCategoryName(e.target.value)}
//               >
//                 {categories.map((category) => (
//                   <MenuItem key={category} value={category}>
//                     {category}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               label="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               type="number"
//               fullWidth
//               required
//               margin="normal"
//             />
//             <TextField
//               label="Stock"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//               type="number"
//               fullWidth
//               required
//               margin="normal"
//             />
//             <TextField
//               label="Discount (%)"
//               value={discount}
//               onChange={(e) => setDiscount(e.target.value)}
//               type="number"
//               fullWidth
//               required
//               margin="normal"
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Save
//             </Button>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// ProductEditForm.propTypes = {
//   product: PropTypes.shape({
//     brand: PropTypes.string,
//     name: PropTypes.string,
//     category: PropTypes.string,
//     price: PropTypes.number,
//     stock: PropTypes.number,
//     discount: PropTypes.number,
//   }).isRequired,
//   onSave: PropTypes.func.isRequired,
// };

// const styles = {
//   form: {
//     padding: '20px',
//   },
// };

// export default ProductEditForm;


// /* eslint-disable react/prop-types */
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Grid, Paper, TextField, Button, MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';

// const ProductEditForm = ({ product, onSave }) => {
//   // Initialize state variables
//   const [brandName, setBrandName] = useState(product?.brand || '');
//   const [productName, setProductName] = useState(product?.name || '');
//   const [categoryName, setCategoryName] = useState(product?.category || 'Electronics'); // Default category
//   const [price, setPrice] = useState(product?.price || '');
//   const [stock, setStock] = useState(product?.stock || '');
//   const [discount, setDiscount] = useState(product?.discount || 10); // Default discount
//   const [description, setDescription] = useState(product?.description || '');

//   // Define product categories locally
//   const categories = ['Electronics', 'Books', 'Clothing', 'Home & Kitchen'];

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedProduct = {
//       brand: brandName,
//       name: productName,
//       category: categoryName,
//       price,
//       stock,
//       discount,
//       description,
//     };
//     onSave(updatedProduct);
//   };

//   return (
//     <Grid container spacing={2} justifyContent="center">
//       <Grid item xs={12} md={8} lg={6}>
//         <Paper elevation={3} style={styles.form}>
//           <Typography variant="h6" gutterBottom>Edit Product</Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Brand Name"
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               fullWidth
//               required
//               margin="normal"
//             />
//             <TextField
//               label="Product Name"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               fullWidth
//               required
//               margin="normal"
//             />
//             <FormControl fullWidth required margin="normal">
//               <InputLabel>Category Name</InputLabel>
//               <Select
//                 value={categoryName}
//                 onChange={(e) => setCategoryName(e.target.value)}
//               >
//                 {categories.map((category) => (
//                   <MenuItem key={category} value={category}>
//                     {category}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               label="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               type="number"
//               fullWidth
//               required
//               margin="normal"
//             />
//             <TextField
//               label="Stock"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//               type="number"
//               fullWidth
//               required
//               margin="normal"
//             />
//             <TextField
//               label="Discount (%)"
//               value={discount}
//               onChange={(e) => setDiscount(e.target.value)}
//               type="number"
//               fullWidth
//               required
//               margin="normal"
//             />
//             <TextField
//               label="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               fullWidth
//               multiline
//               rows={4}
//               margin="normal"
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Save
//             </Button>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// ProductEditForm.propTypes = {
//   product: PropTypes.shape({
//     brand: PropTypes.string,
//     name: PropTypes.string,
//     category: PropTypes.string,
//     price: PropTypes.number,
//     stock: PropTypes.number,
//     discount: PropTypes.number,
//     description: PropTypes.string,
//   }).isRequired,
//   onSave: PropTypes.func.isRequired,
// };

// const styles = {
//   form: {
//     padding: '30px',
//   },
// };

// export default ProductEditForm;


// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Grid, Paper, TextField, Button, MenuItem, Select, Typography, FormControl, InputLabel, Box } from '@mui/material';

// const ProductEditForm = ({ product, onSave }) => {
//   const [brandName, setBrandName] = useState(product?.brand || '');
//   const [productName, setProductName] = useState(product?.name || '');
//   const [categoryName, setCategoryName] = useState(product?.category || 'Electronics');
//   const [price, setPrice] = useState(product?.price || '');
//   const [stock, setStock] = useState(product?.stock || '');
//   const [discount, setDiscount] = useState(product?.discount || 10);
//   const [description, setDescription] = useState(product?.description || '');

//   const categories = ['Electronics', 'Books', 'Clothing', 'Home & Kitchen'];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedProduct = {
//       brand: brandName,
//       name: productName,
//       category: categoryName,
//       price,
//       stock,
//       discount,
//       description,
//     };
//     onSave(updatedProduct);
//   };

//   return (
//     <Grid container spacing={2} justifyContent="center">
//       <Grid item xs={12} md={8} lg={6}>
//         <Paper elevation={3} style={styles.form}>
//           <Typography variant="h6" gutterBottom>Edit Product</Typography>
//           <form onSubmit={handleSubmit}>
//             {/** Brand Name Field */}
//             <Grid container alignItems="center" spacing={2}>
//               <Grid item xs={4}>
//                 <Typography>Brand Name:</Typography>
//               </Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   value={brandName}
//                   onChange={(e) => setBrandName(e.target.value)}
//                   fullWidth
//                   required
//                   margin="normal"
//                 />
//               </Grid>
//             </Grid>
//             {/** Product Name Field */}
//             <Grid container alignItems="center" spacing={2}>
//               <Grid item xs={4}>
//                 <Typography>Product Name:</Typography>
//               </Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   value={productName}
//                   onChange={(e) => setProductName(e.target.value)}
//                   fullWidth
//                   required
//                   margin="normal"
//                 />
//               </Grid>
//             </Grid>
//             {/** Category Name Field */}
//             <Grid container alignItems="center" spacing={2}>
//               <Grid item xs={4}>
//                 <Typography>Category Name:</Typography>
//               </Grid>
//               <Grid item xs={8}>
//                 <FormControl fullWidth required margin="normal">
//                 <TextField
//                   value={categoryName}
//                   onChange={(e) => setCategoryName(e.target.value)}
//                   fullWidth
//                   required
//                   margin="normal"
//                 />
//                 </FormControl>
//               </Grid>
//             </Grid>
//             {/** Price Field */}
//             <Grid container alignItems="center" spacing={2}>
//               <Grid item xs={4}>
//                 <Typography>Price:</Typography>
//               </Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   fullWidth
//                   required
//                   margin="normal"
//                 />
//               </Grid>
//             </Grid>
//             {/** Stock Field */}
//             <Grid container alignItems="center" spacing={2}>
//               <Grid item xs={4}>
//                 <Typography>Stock:</Typography>
//               </Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   value={stock}
//                   onChange={(e) => setStock(e.target.value)}
//                   fullWidth
//                   required
//                   margin="normal"
//                 />
//               </Grid>
//             </Grid>
//             {/** Discount Field */}
//             <Grid container alignItems="center" spacing={2}>
//               <Grid item xs={4}>
//                 <Typography>Discount (%):</Typography>
//               </Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   value={discount}
//                   onChange={(e) => setDiscount(e.target.value)}
//                   fullWidth
//                   required
//                   margin="normal"
//                 />
//               </Grid>
//             </Grid>
//             {/** Description Field */}
//             <Grid container alignItems="center" spacing={2}>
//               <Grid item xs={4}>
//                 <Typography>Description:</Typography>
//               </Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   fullWidth
//                   multiline
//                   rows={4}
//                   margin="normal"
//                 />
//               </Grid>
//             </Grid>
//             {/** Save Button */}
//             <Box mt={2}>
//               <Button type="submit" variant="contained" color="primary">
//                 Save
//               </Button>
//             </Box>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// ProductEditForm.propTypes = {
//   product: PropTypes.shape({
//     brand: PropTypes.string,
//     name: PropTypes.string,
//     category: PropTypes.string,
//     price: PropTypes.number,
//     stock: PropTypes.number,
//     discount: PropTypes.number,
//     description: PropTypes.string,
//   }).isRequired,
//   onSave: PropTypes.func.isRequired,
// };

// const styles = {
//   form: {
//     padding: '30px',
//   },
// };

// export default ProductEditForm;


import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Button, MenuItem, Select, Typography, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';

const ProductEditForm = ({ productId, onSave }) => {
  const [product, setProduct] = useState({
    productId: '',
    productName: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    brandName: [],
    categoryName: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/get/${productId.toString()}`);
        setProduct(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    fetchData();
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} style={styles.form}>
          <Typography variant="h6" gutterBottom>Edit Product</Typography>
          <form onSubmit={handleSubmit}>
            {/* Product Name Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Product Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.productName}
                  onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Brand Name Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Brand Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.brandName[0]} // Lấy giá trị đầu tiên trong mảng
                  onChange={(e) => setProduct({ ...product, brandName: [e.target.value] })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Category Name Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Category Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.categoryName[0]} // Lấy giá trị đầu tiên trong mảng
                  onChange={(e) => setProduct({ ...product, categoryName: [e.target.value] })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Description Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Description:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Price Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Price:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Stock Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Stock:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Discount Field */}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography>Discount (%):</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={product.discount}
                  onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* Save Button */}
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

ProductEditForm.propTypes = {
  productId: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
};

const styles = {
  form: {
    padding: '30px',
  },
};

export default ProductEditForm;
