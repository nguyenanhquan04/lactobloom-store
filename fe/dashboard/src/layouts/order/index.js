import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
;

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { useNavigate } from 'react-router-dom';
import OrdersTable from './data/ordersTableData';

const Orders = () => {
  const navigate = useNavigate();
  const rows = OrdersTable();

  // useEffect(() => {
  //   const authToken = Cookies.get("authToken");

  //   if (!authToken) {
  //     navigate("/authentication/login");
  //     return;
  //   }

  //   try {
  //     const decodedToken = jwtDecode(authToken);
  //     const currentTime = Date.now() / 1000;

  //     if (decodedToken.exp < currentTime) {
  //       Cookies.remove("authToken");
  //       navigate("/authentication/login");
  //     } else {
  //       // Fetch orders data if authentication is successful
  //       fetchOrders(authToken);
  //     }
  //   } catch (e) {
  //     Cookies.remove("authToken");
  //     navigate("/authentication/login");
  //   }
  // }, [navigate]);


  const ordersTableData = {
    columns: [
      { name: "orderId", align: "center" },
      { name: "customerName", align: "center" },
      { name: "totalPrice", align: "center" },
      { name: "status", align: "center" },
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
            <SoftTypography variant="h6">Orders Table</SoftTypography>
            
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
            <Table columns={ordersTableData.columns} rows={ordersTableData.rows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Orders;
