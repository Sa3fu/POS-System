import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img from "../../assets/2529134-ai-brush-removebg-qli96r7.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const role = "cashier"; // Fixed role

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!username || typeof username !== "string") {
      newErrors.username = "Please enter a valid username.";
    }

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include at least one number and one special character.";
    }

    // If there are any errors, update state and return early
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user/createUser",
        {
          username,
          email,
          password,
          role, // Include the fixed role in the registration data
        }
      );

      // Assuming successful registration redirects to login page
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({
          server: error.response.data.message || "An error occurred.",
        });
      } else {
        setErrors({ server: "Failed to connect to the server." });
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
        <div className="flex-auto"></div>

        {/* Register Form Section */}
        <div className="relative flex-none bg-white p-8 rounded shadow-md w-1/2">
          <h1 className="text-2xl mb-4">User Registration</h1>
          <form onSubmit={handleRegister}>
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
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1"
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-8 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Hidden role input */}
            <input type="hidden" value={role} />

            {/* Server or general error message */}
            {errors.server && (
              <p className="text-red-500 text-sm mb-4">{errors.server}</p>
            )}

            <button
              type="submit"
              className="w-20 bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
            >
              Register
            </button>
            <div>
              <p className="text-sm">
                If login present {""}
                <Link to="/" className="text-blue-400 underline">
                  Login Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
