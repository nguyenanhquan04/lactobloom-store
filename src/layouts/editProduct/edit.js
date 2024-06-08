/* eslint-disable react/prop-types */
// @mui material components
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material'
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data



function EditForm() {

    const action = (
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
          more_vert
        </Icon>
      ); 

  const EForm = {
    columns: [
      { name: "productId", align: "center" },
      { name: "brandName", align: "center" },
      { name: "productName", align: "center" },
      { name: "categoryName", align: "center" },
      { name: "price", align: "center" },
      { name: "stock", align: "center" },
      { name: "action", align: "center" },
    ],
     rows: [
        {
          
          productId: (
            <TextField></TextField>
          ),
          brandName: (
            <TextField></TextField>
          ),
          productName: (
            <TextField></TextField>
          ),
          categoryName:(
            <TextField></TextField>
          ),
          price: (
            <TextField></TextField>
          ),
          stock: (
            <TextField></TextField>
          ),
          action
        },
      ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Product table</SoftTypography>
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
            <Table columns={EForm.columns} rows={EForm.rows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditForm;
