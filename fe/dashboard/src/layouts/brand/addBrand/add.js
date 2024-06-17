import React from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import BrandAddForm from "./form";  // Import the ProductAddForm component

function AddBrand() {
  const handleSave = (newCategory) => {
    console.log('New category added:', newCategory);
    // Handle save logic here, such as sending the new product to a server
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={5}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Add Brand </SoftTypography>
            </SoftBox>
            <SoftBox p={3}>
              <BrandAddForm onSave={handleSave} />  {/* Render the form */}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddBrand;
