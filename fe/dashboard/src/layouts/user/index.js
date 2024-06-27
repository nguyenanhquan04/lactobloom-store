import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { IconButton } from "@mui/material";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { useNavigate } from "react-router-dom";
import UsersTable from "./data/usersTableData";

function User() {
  
  const navigate = useNavigate();
  
  // Add a new state variable for the search value
  const [searchValue, setSearchValue] = useState("");

  // Update the search value when the user types in the input
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  

  const rows = UsersTable({searchValue}); // Call UsersTable to get data

  const handleAddUserClick = () => {
    navigate("/users/new"); 
  };

  const usersTableData = {
    columns: [
      { name: "userId", align: "center" },
      { name: "fullName", align: "center" },
      { name: "role", align: "center" },
      { name: "email", align: "center" },
      { name: "phone", align: "center" },
      { name: "address", align: "center" },
      { name: "point", align: "center" },
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
            <SoftTypography variant="h6">Users Table</SoftTypography>
            <SoftInput
              placeholder="Type user here..."
              fullWidth
              icon={{ component: "search", direction: "left" }}
              value={searchValue} // Set the value of the input to the current search value
              onChange={handleSearchChange} // Update the search value when the user types
            />
            <IconButton onClick={handleAddUserClick}>
              <SoftButton type="submit" variant="contained" color="dark">
                Add New User
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
            <Table columns={usersTableData.columns} rows={usersTableData.rows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default User;
