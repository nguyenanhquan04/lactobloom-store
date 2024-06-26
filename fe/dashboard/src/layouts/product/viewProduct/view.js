// ViewForm.js
/* eslint-disable react/prop-types */
// @mui material components
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProductViewForm from "./form";  // Import the ProductViewForm component
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
const sampleProduct = {
    id: '123',
    brand: 'Sample Brand',
    name: 'Sample Product',
    category: 'Milk',
    price: 100,
    stock: 50,
    discount: 10,
  };

function ViewForm() {
  const handleSave = (product) => {
    console.log('Product viewed:', product);
    // Additional logic if needed when a product is viewed
  };

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken");

    if (!authToken) {
      navigate("/authentication/login");
    }

    try {
      const decodedToken = jwtDecode(authToken);
      const currentTime = Date.now() / 1000;

      // Check if the token is expired
      if (decodedToken.exp < currentTime) {
        Cookies.remove("authToken");
        navigate("/authentication/login");
      }
    } catch (e) {
      // If token is invalid, remove it and redirect to login
      Cookies.remove("authToken");
      navigate("/authentication/login");
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={5}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">View Product</SoftTypography>
            </SoftBox>
            <SoftBox p={3}>
              <ProductViewForm product={sampleProduct} onSave={handleSave} />  {/* Render the form */}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewForm;
