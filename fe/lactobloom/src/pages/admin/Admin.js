// import React, { Fragment, useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// const Sidebar = ({ onSelect }) => {
//   return (
//     <div className="col-lg-2">
//       <div className="sidebar">
//         <ul className="nav flex-column">
//           <li className="nav-item">
//             <Link className="sidebar-link" onClick={() => onSelect("product")}>
//               Products Management
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="sidebar-link" onClick={() => onSelect("blog")}>
//               Blogs Management
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="sidebar-link" onClick={() => onSelect("category")}>
//               Categories Management
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="sidebar-link" onClick={() => onSelect("brand")}>
//               Brands Management
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="sidebar-link" onClick={() => onSelect("order")}>
//               Orders Management
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="sidebar-link" onClick={() => onSelect("user")}>
//               Users Management
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// const Admin = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState("product"); // Default selection

//   // Check for authToken cookie and redirect to homepage if it exists
//   useEffect(() => {
//     const token = Cookies.get("authToken");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       if (decodedToken.role === "MEMBER") {
//         navigate("/"); // Redirect to homepage
//       }
//     }
//   }, [navigate]);

//   const renderContent = () => {
//     switch (selected) {
//       case "product":
//         return <div>Product Management Content</div>; // Replace with actual content
//       case "blog":
//         return <div>Blog Management Content</div>; // Replace with actual content
//       case "category":
//         return <div>Category Management Content</div>;
//       case "brand":
//         return <div>Brand Management Content</div>;
//       case "order":
//         return <div>Order Management Content</div>;
//       case "user":
//         return <div>User Management Content</div>;
//       default:
//         return <div>Product Management Content</div>; // Default content
//     }
//   };

//   return (
//     <Fragment>
//       <SEO titleTemplate="Admin" description="Lactobloom Admin Page." />
//       <LayoutOne headerTop="visible">
//         {/* breadcrumb */}
//         <Breadcrumb
//           pages={[
//             { label: "Home", path: process.env.PUBLIC_URL + "/" },
//             { label: "Admin", path: process.env.PUBLIC_URL + pathname },
//           ]}
//         />
//         <div className="row">
//           <Sidebar onSelect={setSelected} />
//           <div className="col-lg-9">{renderContent()}</div>
//         </div>
//       </LayoutOne>
//     </Fragment>
//   );
// };

// export default Admin;


import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Import jwtDecode correctly
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";
import BlogManagement from "./BlogManagement";
import BrandManagement from "./BrandManagement";
import CategoryManagement from "./CategoryManagement";
import OrderManagement from "./OrderManagement";

const Sidebar = ({ onSelect, role }) => {
  return (
    <div className="col-lg-2">
      <div className="sidebar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("product")}>
              Products Management
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("blog")}>
              Blogs Management
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("category")}>
              Categories Management
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("brand")}>
              Brands Management
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("order")}>
              Orders Management
            </Link>
          </li>
          {role === "ADMIN" && (
            <li className="nav-item">
              <Link className="sidebar-link" onClick={() => onSelect("user")}>
                Users Management
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const Admin = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("product"); // Default selection
  const [role, setRole] = useState(""); // State to store user role

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role); // Set the user role
      if (decodedToken.role === "MEMBER") {
        navigate("/"); // Redirect to homepage
      }
    }
  }, [navigate]);

  const renderContent = () => {
    switch (selected) {
      case "product":
        return <ProductManagement />;
      case "blog":
        return <BlogManagement />;
      case "category":
        return <CategoryManagement />;
      case "brand":
        return <BrandManagement />;
      case "order":
        return <OrderManagement />;
      case "user":
        return <UserManagement />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="Admin" description="Lactobloom Admin Page." />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Admin", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="row">
          <Sidebar onSelect={setSelected} role={role} />
          <div className="col-lg-9">
            {renderContent()}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Admin;
