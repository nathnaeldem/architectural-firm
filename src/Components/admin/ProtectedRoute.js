import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';// Ensure `jwt-decode` is installed

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Ensure data is retrieved as a single object

  if (!user || !user.token) {
    return <Navigate to="/admin" />;
  }

  try {
    const decodedToken = jwtDecode(user.token);

    // Check if the token has expired
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('user');
      return <Navigate to="/admin" />;
    }

    // Role validation
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }
  } catch (err) {
    console.error('Token validation error:', err);
    localStorage.removeItem('user');
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;