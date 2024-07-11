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
import Dashboard from "./Dashboard";
import VoucherManagement from "./VoucherManagement";

const Sidebar = ({ onSelect, role }) => {
  return (
    <div className="col-lg-2">
      <div className="sidebar">
        <ul className="nav flex-column">
        <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("dashboard")}>
              Biểu đồ
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("product")}>
              Quản lý sản phẩm
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("blog")}>
              Quản lý bài viết
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("category")}>
              Quản lý danh mục
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("brand")}>
              Quản lý thương hiệu
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("order")}>
              Quản lý đơn hàng
            </Link>
          </li>
          <li className="nav-item">
            <Link className="sidebar-link" onClick={() => onSelect("voucher")}>
              Quản lý Voucher
            </Link>
          </li>
          {role === "ADMIN" && (
            <li className="nav-item">
              <Link className="sidebar-link" onClick={() => onSelect("user")}>
                Quản lý người dùng
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
  const [selected, setSelected] = useState("dashboard"); // Default selection
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
      case "dashboard":
        return <Dashboard />;
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
        case "voucher":
        return <VoucherManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="Admin" description="Lactobloom Admin Page." />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Trang Chủ", path: process.env.PUBLIC_URL + "/" },
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
