// EditForm.js
/* eslint-disable react/prop-types */
// @mui material components
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import BrandEditForm from "./form";

// Sample product data for demonstration
const sampleProduct = {
  id: '123',
  brand: 'Sample Brand',
};

function EditBrand() {
  const handleSave = (updatedProduct) => {
    console.log('Brand saved:', updatedProduct);
    // Handle save logic here, such as sending the updated product to a server
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={5}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Edit Brand</SoftTypography>
            </SoftBox>
            <SoftBox p={3}>
              <BrandEditForm product={sampleProduct} onSave={handleSave} />  {/* Render the form */}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditBrand;


// // EditForm.js
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Card from "@mui/material/Card";
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import ProductEditForm from "./form";  // Import the ProductEditForm component

// function EditForm() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8080/product/${id}`)
//       .then(response => {
//         setProduct(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching product data:", error);
//       });
//   }, [id]);

//   const handleSave = (updatedProduct) => {
//     console.log('Product saved:', updatedProduct);
//     // Handle save logic here, such as sending the updated product to a server
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <SoftBox mb={5}>
//           <Card>
//             <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//               <SoftTypography variant="h6">Edit Product</SoftTypography>
//             </SoftBox>
//             <SoftBox p={3}>
//               <ProductEditForm product={product} onSave={handleSave} />  {/* Render the form */}
//             </SoftBox>
//           </Card>
//         </SoftBox>
//       </SoftBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default EditForm;
