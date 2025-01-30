import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [facultyid, setFacultyid] = useState(""); // Add faculty ID state
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login and Register

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Register user
      try {
        const response = await axios.post("http://localhost:5000/api/register", {
          email,
          password,
          facultyid, // Include facultyid in registration
        });
        console.log("User registered successfully:", response.data);
        alert("Registration successful. You can now log in.");
        setIsRegistering(false); // Switch to login view after registration
      } catch (error) {
        console.error("Error registering user:", error.response ? error.response.data : error.message);
        alert("Registration failed. Please try again.");
      }
    } else {
      // Login user
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });

        console.log("Login Response:", response.data); // Debugging line to inspect response structure

        // Check if the response contains the user data
        if (response.data && response.data.user) {
          // If the user is admin, navigate to admin home page
          if (response.data.user.email === "admin@gmail.com") {
            console.log("Admin login successful!");
            navigate("/adminhome"); // Navigate to the admin home page if the credentials match
          } else {
            console.log("Normal user login successful.");
            // For normal user
            localStorage.setItem("facultyid", response.data.user.facultyid); // Store facultyid
            localStorage.setItem("userEmail", response.data.user.email); // Store email
            navigate("/home"); // Navigate to the home page upon successful login
          }
        } else {
          alert("Invalid credentials. Please check your email and password.");
        }
      } catch (error) {
        console.error("Error logging in:", error.response ? error.response.data : error.message);
        alert("Login failed. Please check your credentials.");
      }
    }
  };

  const toggleForm = () => {
    setIsRegistering((prev) => !prev); // Toggle between login and register views
  };

  return (
    <div className="vehicle-login-container">
      <div className="vehicle-login-card">
        <h1 className="vehicle-login-header">
          {isRegistering ? "REGISTER FOR VEHICLE MANAGEMENT PORTAL" : "VEHICLE MANAGEMENT PORTAL"}
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="vehicle-login-label">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="vehicle-login-input"
            required
          />

          <label htmlFor="password" className="vehicle-login-label">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="vehicle-login-input"
            required
          />

          {isRegistering && (
            <>
              <label htmlFor="facultyid" className="vehicle-login-label">Faculty ID</label>
              <input
                type="text"
                id="facultyid"
                placeholder="Enter your Faculty ID"
                value={facultyid}
                onChange={(e) => setFacultyid(e.target.value)}
                className="vehicle-login-input"
                required
              />
            </>
          )}

          <button type="submit" className="vehicle-login-button">
            {isRegistering ? "Register" : "Sign in"}
          </button>
        </form>

        <div className="vehicle-login-footer">
          <button className="vehicle-login-toggle" onClick={toggleForm}>
            {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
