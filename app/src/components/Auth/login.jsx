import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/2529134-ai-brush-removebg-qli96r7.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/user/auth", {
        username,
        password,
      });
      const { token, role } = response.data;

      // Store token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Redirect based on user role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "cashier") {
        navigate("/cashier");
      } else {
        setError("Unauthorized role.");
      }
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "An error occurred.");
        setUsername("");
        setPassword("");
      } else {
        setError("Failed to connect to the server.");
        setUsername("");
        setPassword("");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to right, rgba(127, 161, 195, 0.4) 60%, rgba(255, 255, 255, 0) 100%)",
      }}
    >
      {/* POS Billing System Heading */}
      <div className="absolute top-10">
        <h1 className="text-3xl font-bold">POS Billing System</h1>
      </div>

      <div className="flex w-full max-w-6xl">
        {/* Image Section */}
        <div className="flex-none w-1/4 flex justify-start items-center">
          <img src={img} alt="Decoration" className="transform scale-150" />
        </div>

        {/* Spacer */}
        <div className=" flex-auto"></div>

        {/* Login Form Section */}
        <div className="flex-none bg-white p-8 rounded shadow-md w-1/3">
          <h1 className="text-2xl mb-4">User Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-1"
              >
                Username:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-8 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-1"
              >
                Password:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-8 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {/* Error message container with fixed height */}
            <div>{error && <p className="text-red-500">{error}</p>}</div>

            <button
              type="submit"
              className="w-20 bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-2"
            >
              Login
            </button>
            <div>
              <p className="text-sm">
                Create new user {""}
                <Link to="/register" className="text-blue-400 underline">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
