import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import PrivateRoute from "./components/Auth/privateRoute";
import AdminDashboard from "./components/AdminDashbord/adminDashbord";
import CashierDashboard from "./components/CashierDashboard/cashierDashboard";

function app() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={<PrivateRoute element={AdminDashboard} />}
        />
        <Route
          path="/cashier"
          element={<PrivateRoute element={CashierDashboard} />}
        />
      </Routes>
    </Router>
  );
}

export default app;
