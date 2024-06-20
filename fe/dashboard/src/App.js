import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import routes from "routes";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brand from "assets/images/logo-ct.png";
import EditForm from "layouts/product/editProduct/edit";
import AddForm from "layouts/product/addProduct/add";
import AddCategory from "layouts/category/addCategory/add";
import AddBrand from "layouts/brand/addBrand/add";
import EditCategory from "layouts/category/editCagetory/edit";
import EditBrand from "layouts/brand/editBrand/edit";
import ViewForm from "layouts/product/viewProduct/view";
import ViewOrderForm from "layouts/order/viewOrder/view";
import EditUser from "layouts/user/editUser/edit";



export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Soft UI Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/authentication/login" />} />

        {/* Routes of product */}
        <Route path="/products/view/:productId" element={<ViewForm />} /> 
        <Route path="/products/:productId" element={<EditForm />} /> 
        <Route path="/products/new" element={<AddForm />} />
        

        { /* Routes of Category */ }
        <Route path="/categories/new" element={<AddCategory />} />
        <Route path="/categories/:categoryId" element={<EditCategory />} />

        {/* Routes of Brand */}
        <Route path="/brands/new" element={<AddBrand />} />
        <Route path="/brands/:brandId" element={<EditBrand/>} />

        {/* Routes of Order */}
        <Route path ="/orders/view/:orderId" element={<ViewOrderForm />}/>

        {/* Routes for User */}
        
        <Route path ="/users/edit/:userId" element={<EditUser />}/>
        {/* <Route path ="/users/view/:userId" element={<ViewUSer />}/> */}
      </Routes>
    </ThemeProvider>
  );
}
