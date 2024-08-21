import React from "react";
import { Route, Redirect } from "react-router-dom";

// A higher order component to protect routes
const privateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  return (
    <Route
      {...rest}
      render={(props) => {
        isAuthenticated ? (
          <Component {...props} role={userRole} />
        ) : (
          <Redirect to="login" />
        );
      }}
    />
  );
};

export default privateRoute;
