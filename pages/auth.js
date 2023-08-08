import React, { useState } from "react";
import axios, { Axios } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};
  
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
        
      });
    
  
     //alert("login sucess");
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      localStorage.setItem('token',result.data.token)
      navigate("/");
      toast.success("Login successful!");
      
    } catch (error) {
        <div> 
      console.error("Login error:", error);
     
      </div>
      // Add error handling to provide feedback to the user (e.g., show an error message).
      toast.error("login failed!");
    }
   
  };

  return (
    <div className="auth-container - card">
  <form className="container p-4" onSubmit={handleSubmit}>
    <h2 className="text-center">Login</h2>
    <div className="mb-3">
      <label htmlFor="username" className="form-label">Username:</label>
      <input
        type="text"
        required
        className="form-control"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password:</label>
      <input
        type="password"
        required
        className="form-control"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </div>
    <button className="btn btn-primary" type="submit">Login</button>
  </form>
</div>

  );
};


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      handleSubmit();
      toast.success("Registration Completed! Now login.");
    } catch (error) {
      console.error("Registration error:", error);
      // Add error handling to provide feedback to the user (e.g., show an error message).
      toast.error("Regestration failed!!");
    }
  };

  return (
    <div className="auth-container - card">
    <form className="container p-4" onSubmit={handleSubmit}>
      <h2 className="text-center">Register</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username:</label>
        <input
          type="text"
          required
          className="form-control"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          required
          className="form-control"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit">Register</button>
    </form>
  </div>
  
  );
};
