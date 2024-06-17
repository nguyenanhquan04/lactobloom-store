// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import User from "layouts/user";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
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
  // {
  //   type: "collapse",
  //   name: "Edit Demo",
  //   key: "editProduct",
  //   route: "/products/:productId",
  //   icon: <CreditCard size="12px" />,
  //   component: <EditForm />,
  //   noCollapse: true,
  // },
  
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
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  
];

export default routes;
