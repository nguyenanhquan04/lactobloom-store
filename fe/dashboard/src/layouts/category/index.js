import React, { useState } from 'react';
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { IconButton } from "@mui/material";
import SoftButton from "components/SoftButton";
import SoftInput from 'components/SoftInput';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { useNavigate } from 'react-router-dom';
import CategoriesTable from './data/categoriesTableData';


function Category() {
  const navigate = useNavigate();
  
  const rows = CategoriesTable(); 

  const handleAddCategoryClick = () => {
    navigate('/categories/new'); // Navigate to the route for adding a new product
  };

  const categoriesTableData = {
    columns: [
      { name: "categoryId", align: "center" },
      { name: "categoryName", align: "center" },
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
            <SoftTypography variant="h6">Category table</SoftTypography>
            <SoftInput
                placeholder="Type here..."
                fullWidth
                icon={{ component: "search", direction: "left" }}
              />
            <IconButton onClick={handleAddCategoryClick}>
              <SoftButton type="submit" variant="contained" color="dark">
                Add New Category
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
            <Table columns={categoriesTableData.columns} rows={categoriesTableData.rows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Category;
