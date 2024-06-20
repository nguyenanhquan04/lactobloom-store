import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { register } from "../../utils/UserService"; // Adjust the import path as needed
import Cookies from 'js-cookie'; // Import js-cookie

const Register = () => {
  let { pathname } = useLocation();
  let navigate = useNavigate();

  const [registerData, setRegisterData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  // Check for authToken cookie and redirect to homepage if it exists
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      navigate("/"); // Redirect to homepage
    }
  }, [navigate]);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await register(registerData.fullName, registerData.email, registerData.password);
      alert("Registration successful", response.data);
      console.log("Registration successful", response.data);
      // Navigate to a different page on successful registration
      navigate("/login"); // Adjust the path as needed
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Register"
        description="Lactobloom Register Page."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Register", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegisterSubmit}>
                              <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={registerData.fullName}
                                onChange={handleRegisterChange}
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                              />
                              <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={registerData.confirmPassword}
                                onChange={handleRegisterChange}
                              />
                              {error && <p style={{ color: 'red' }}>{error}</p>}
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Register;
