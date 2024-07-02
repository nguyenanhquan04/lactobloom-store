import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { IconButton } from "@mui/material";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Table from "examples/Tables/Table";
import BlogsTable from "./data/blogsTableData"; // Assuming you have a component or function to fetch blog data

function Blog() {
  const navigate = useNavigate();

  // Add a new state variable for the search value
  const [searchValue, setSearchValue] = useState("");

  // Update the search value when the user types in the input
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const rows = BlogsTable({ searchValue }); // Call BlogsTable to get data

  const handleAddBlogClick = () => {
    navigate("/blogs/new"); // Navigate to the route for adding a new blog
  };

  
  const blogsTableData = {
    columns: [
      { name: "blogId", align: "center" },
      { name: "title", align: "left" },
      // { name: "blogCategoryName", align: "center" }, // Assuming you fetch blogCategoryName in blogsTableData
      { name: "publishDate", align: "center" },
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
            <SoftTypography variant="h6">Blogs Table</SoftTypography>
            <SoftInput
              placeholder="Type blog title here..."
              fullWidth
              icon={{ component: "search", direction: "left" }}
              value={searchValue} // Set the value of the input to the current search value
              onChange={handleSearchChange} // Update the search value when the user types
            />
            <IconButton onClick={handleAddBlogClick}>
              <SoftButton type="submit" variant="contained" color="dark">
                Add New Blog
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
            <Table columns={blogsTableData.columns} rows={blogsTableData.rows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Blog;
