import React, { useEffect } from 'react';
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { IconButton } from "@mui/material";
import SoftButton from "components/SoftButton";
import SoftInput from 'components/SoftInput';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

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
