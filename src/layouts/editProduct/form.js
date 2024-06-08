/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

// Soft UI Dashboard React components

import SoftTypography from "components/SoftTypography";
import React,{useState,useEffect} from "react";

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const productsTableData = {
  columns: [
    { name: "productId", align: "left" },
    { name: "brandName", align: "left" },
    { name: "productName", align: "left" },
    { name: "categoryName", align: "left" },
    { name: "price", align: "left" },
    { name: "stock", align: "left" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      
      productId: (
        <TextField></TextField>
      ),
      brandName: "Meiji",
      productName: " Sữa Meiji",
      categoryName:"Sữa Nhật",
      price: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $2,500
        </SoftTypography>
      ),
      stock: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          1111
        </SoftTypography>
      ),
      action
    },
  ],
};

export default productsTableData;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Icon from "@mui/material/Icon";
// import SoftTypography from "components/SoftTypography";
// import SoftButton from "components/SoftButton";

// const action = (
//   <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
//     more_vert
//   </Icon>
// );

// const Form = () => {
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8080/product/all")
//       .then(response => {
//         const dataFromAPI = response.data;

//         const formattedData = dataFromAPI.map(product => ({
//           productId: product.productId.toString(),
//           brandName: product.brandName[0],
//           productName: product.productName,
//           categoryName: product.categoryName[0],
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
//           action
//           // action: (
//           //   <SoftButton
//           //   component={Link}
//           //   href="http://localhost:3000/products/1"
//           //   target="_blank"
//           //   rel="noreferrer"
//           //   color="dark"
//           //   variant="outlined"
//           //   fullWidth
//           // ></SoftButton>
//           // ),
//         }));

//         setRows(formattedData);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return rows;
// };

// export default Form;