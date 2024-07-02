import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import BlogEditForm from './form';

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Accessing blogId from URL params

  useEffect(() => {
    validateToken(); // Validate token when component mounts
  }, []);

  const validateToken = () => {
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      navigate('/authentication/login');
    }

    try {
      const decodedToken = jwtDecode(authToken);
      const currentTime = Date.now() / 1000;

      // Check if the token is expired
      if (decodedToken.exp < currentTime) {
        Cookies.remove('authToken');
        navigate('/authentication/login');
      }
    } catch (e) {
      // If token is invalid, remove it and redirect to login
      Cookies.remove('authToken');
      navigate('/authentication/login');
    }
  };

  const handleSave = (newBlog) => {
    console.log('Updated blog:', newBlog);
    // Handle save logic here, such as updating the blog list
    navigate('/blogs'); // Navigate to the blog list after saving
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <BlogEditForm blogId={id} onSave={handleSave} />
      <Footer />
    </DashboardLayout>
  );
};

export default EditBlog;
