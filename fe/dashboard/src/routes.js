// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import User from "layouts/user";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import Login from "layouts/authentication/login";
import Product from "layouts/product";
import Category from "layouts/category";
import Brand from "layouts/brand";




// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import ViewForm from "layouts/order/viewOrder/view";
import Orders from "layouts/order";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <Office size="12px" />,
    component: <User />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Products Management",
    key: "product",
    route: "/products",
    icon: <Office size="12px" />,
    component: <Product />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Categories Management",
    key: "category",
    route: "/categories",
    icon: <Office size="12px" />,
    component: <Category />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Brands Management",
    key: "brand",
    route: "/brands",
    icon: <Office size="12px" />,
    component: <Brand />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Order Management",
    key: "orders",
    route: "/orders",
    icon: <CreditCard size="12px" />,
    component: <Orders />,
    noCollapse: true,
  },
  
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Login",
    key: "login",
    route: "/authentication/login",
    icon: <Document size="12px" />,
    component: <Login />,
    noCollapse: true,
  },
  
];

export default routes;
