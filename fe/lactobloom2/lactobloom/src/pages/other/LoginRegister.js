import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginApi } from "../../services/UserService";

const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const [username, setUsername ] = useState("");
  const [password, setPassword ] = useState("");
  const handleLogin = async () => {
    if(!username || !password){
      alert("Email/Password is required");
      return;
    }

    let res = await loginApi(username, password);
    console.log(">>> Check Login: ", res);
  }

  return (
    <Fragment>
      <MetaTags>
        <title>LactoBloom Store | Login</title>
        <meta name="description" content="Login page of LactoBloom Store" />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            {/* <form> */}
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                              />
                              <div>
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                              />
                              </div>
                              <div>
                                <GoogleOAuthProvider clientId="64377350964-84072rsp206n3hqumg4fmt3em36s8a8g.apps.googleusercontent.com">
                                  <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                      const decoded = jwtDecode(
                                        credentialResponse?.credential
                                      );
                                      console.log(decoded);
                                    }}
                                    onError={() => {
                                      console.log("Login Failed");
                                    }}
                                  />
                                </GoogleOAuthProvider>
                              </div>
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <div class="button-wrapper">
                                  <button 
                                  type="submit"
                                  onClick={() => handleLogin()}
                                  >
                                    <span>Login</span>
                                  </button>
                                </div>
                              </div>
                            {/* </form> */}
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            {/* <form> */}
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                              />
                              <div className="button-box">
                                <div class="button-wrapper">
                                  <button type="submit">
                                    <span>Register</span>
                                  </button>
                                </div>
                              </div>
                            {/* </form> */}
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

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
