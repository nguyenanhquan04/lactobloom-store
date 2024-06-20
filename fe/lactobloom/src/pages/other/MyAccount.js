import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import {
  userInfo,
  updateUserInfo,
  changePassword,
} from "../../utils/UserService";

const MyAccount = () => {
  let { pathname } = useLocation();
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.sub);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await userInfo();
        setUser(response.data);
        setFullName(response.data.fullName);
        setAddress(response.data.address);
        setPhone(response.data.phone);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = Cookies.get("authToken");

    try {
      await updateUserInfo(
        {
          fullName,
          email,
          address,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Optionally display a success message or update the state
    } catch (error) {
      console.error("Failed to update user info:", error);
      // Optionally handle the error, e.g., display a message to the user
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New Password and Confirm New Password do not match");
      return;
    }
    setPasswordError(""); // Clear any previous error

    const token = Cookies.get("authToken");

    try {
      const response = await changePassword(
        {
          password: oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
    } catch (error) {
      alert(error.response.data); // Alert the error response message
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="Lactobloom My Account Page."
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>My Account Information</h4>
                            <h5>Your Personal Details</h5>
                          </div>
                          <form onSubmit={handleUpdate}>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Full Name</label>
                                  <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) =>
                                      setFullName(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email</label>
                                  <input type="email" value={email} disabled />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Address</label>
                                  <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Phone</label>
                                  <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Point</label>
                                  <input
                                    type="text"
                                    value={user?.point || 0}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Update</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="1"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>2 .</span> Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Change Password</h4>
                            <h5>Your Password</h5>
                          </div>
                          <form onSubmit={handleChangePassword}>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Old Password</label>
                                  <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) =>
                                      setOldPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>New Password</label>
                                  <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                      setNewPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Confirm New Password</label>
                                  <input
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) =>
                                      setConfirmNewPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            {passwordError && (
                              <p style={{ color: "red" }}>{passwordError}</p>
                            )}
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Confirm</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
