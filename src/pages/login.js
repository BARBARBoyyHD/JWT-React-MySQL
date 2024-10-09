import React, { useState } from "react";
import NavBar from "../components/layout/navBar";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/authContext"; // Import useAuth

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuth(); // Access the login function from useAuth
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5252/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send the form data in the request body
    })
      .then((res) => {
        if (res.ok) {
          return res.json();// Parse the JSON if the response is OK
        } else {
          throw new Error("Login failed"); // Handle login failure
        }
      })
      .then((data) => {
        console.log(data); // Log the returned data for debugging
        // Use the login function from context to set token
        localStorage.setItem("accessToken :", data.accessToken);
        localStorage.setItem("refreshToken :", data.refreshToken);
        console.log("Login successful");
        alert("Login successful, ");
        navigate("/profile"); // Redirect to profile after successful login
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Login failed, please try again."); // Display error message
      });
  };

  return (
    <div>
      <NavBar />
      <section className={styles.section}>
        <div className={styles.box_Login}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.wrap_input}>
              <label htmlFor="username">Username </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className={styles.wrap_input}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className={styles.wrap_button}>
              <button type="submit">Login</button>
              <Link to="/register" className={styles.link}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
