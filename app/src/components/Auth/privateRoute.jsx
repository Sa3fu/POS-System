import React from "react";
import { Navigate } from "react-router-dom";

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  // Check if the token exists and is valid (you might want to verify the token's expiry date, etc.)
  return token ? true : false;
};

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
