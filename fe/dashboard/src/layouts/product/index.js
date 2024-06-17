import React, { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { IconButton } from "@mui/material";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { useNavigate } from "react-router-dom";
import ProductsTable from "./data/productsTableData";

function Product() {
  const navigate = useNavigate();

  // Add a new state variable for the search value
  const [searchValue, setSearchValue] = useState("");

  // Update the search value when the user types in the input
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const rows = ProductsTable({searchValue}); // Gọi ProductsTable để lấy dữ liệu

  const handleAddProductClick = () => {
    navigate("/products/new"); // Navigate to the route for adding a new product
  };

  const productsTableData = {
    columns: [
      { name: "productId", align: "center" },
      { name: "brandName", align: "center" },
      { name: "productName", align: "left" },
      { name: "categoryName", align: "center" },
      { name: "price", align: "center" },
      { name: "stock", align: "center" },
      { name: "action", align: "center" },
    ],
    rows: rows,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Product table</SoftTypography>
            <SoftInput
              placeholder="Type product here..."
              fullWidth
              icon={{ component: "search", direction: "left" }}
              value={searchValue} // Set the value of the input to the current search value
                onChange={handleSearchChange} // Update the search value when the user types
            />
            <IconButton onClick={handleAddProductClick}>
              <SoftButton type="submit" variant="contained" color="dark">
                Add New Product
              </SoftButton>
            </IconButton>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={productsTableData.columns} rows={productsTableData.rows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Product;
