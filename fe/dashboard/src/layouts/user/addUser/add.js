import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import UserAddForm from "./form"; // Make sure the path is correct
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Import jwtDecode without destructuring
import { useNavigate } from "react-router-dom";

function AddUser() {
  const handleSave = (newUser) => {
    console.log('New user added:', newUser);
    // Handle save logic here, such as sending the new user to a server
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
              <SoftTypography variant="h6">Add New User</SoftTypography>
            </SoftBox>
            <SoftBox p={3}>
              <UserAddForm onSave={handleSave} />  {/* Render the form */}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddUser;
