import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

// @mui/material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

const login = (email, password) => {
  return axios.post('http://localhost:8080/auth/login', {
    email: email,
    password: password
  });
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const token = response.data.token; // Assuming the token is in the response data
      const decodedToken = jwtDecode(token);

      // Check if the role is MEMBER
      if (decodedToken.role === "MEMBER") {
        setErrorMessage("You do not have access rights.");
        return;
      }

      Cookies.set('authToken', token, { expires: rememberMe ? 7 : undefined }); // Set cookie expiration based on remember me
      console.log("Login successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || "Unknown error");
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        const currentTime = Date.now() / 1000;

        // Check if the token is expired
        if (decodedToken.exp >= currentTime) {
          navigate("/dashboard");
        }
      } catch (e) {
        // If token is invalid, remove it
        Cookies.remove("authToken");
      }
    }
  }, [navigate]);

  return (
    <CoverLayout title="Welcome!" image={curved9}>
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        {errorMessage && (
          <SoftBox mb={2} color="red">
            <SoftTypography variant="body2" color="error">
              {errorMessage}
            </SoftTypography>
          </SoftBox>
        )}
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
            Sign In
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default Login;
