import React, { useState } from "react";
import NavBar from "../components/layout/navBar";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Optional state management for form values (to handle form submission if needed)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5252/register',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res)=>{
        if(res.ok){
            navigate('/login')
            alert("Registration Successful")
            setFormData({
                username: "",
                password: "",
                email: "",
            });
        }
        else{
            alert("Registration Failed")
        }
    })
    .catch((error)=>console.log(error))
  };

  return (
    <div>
      <NavBar />
      <section className={styles.section}>
        <div className={styles.box_Register}>
          <h2>Create a New Account</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.wrap_input}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.wrap_input}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.wrap_input}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.wrap_button}>
              <button type="submit">Register</button>
              <Link to="/login" className={styles.link}>
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
