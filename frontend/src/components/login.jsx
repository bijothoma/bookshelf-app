import React, { useState } from "react";
import person_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import axios from "axios";
import "../styles/login.css";
import { Navigate } from "react-router-dom";
import { useUser } from "../services/userContext";

const Login = () => {
  const { userId, setUser } = useUser();
  const { userName, setUserName} = useUser();
  const [action, setAction] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const resetData = () => {
    setData({ ...data, name: "", email: "", password: "" });
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLogin = async () => {
    setAction("Login");
    // if (email === "bijothoma@gmail.com" && pwd === "123") {
    //   localStorage.setItem("Email", email);
    //   localStorage.setItem("Pwd", pwd);
    // }
    if (data.email === "") return;
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, {
        email: data.email,
        password: data.password,
      });
      if(!res.data){
        console.log(res.message);
      } else{
        console.log(res.data);
        console.log("id : " ,res.data._id);
        localStorage.setItem("userData",res.data);
        setUser(res.data._id);
        setUserName(res.data.name)
        //window.location.reload(false);
        window.location.href = '/';
      }
      
    } catch (error) {
      setError(error.response);
    }
  };
  const handleSignUp = async () => {
    setAction("Sign Up");
    if (data.email === "") return;
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      setAction("Login");
      resetData();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <div className="signin-title">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="signin-credentials">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="inputs">
            <img src={person_icon} alt="" />
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              required
              placeholder="Name"
              onChange={handleChange}
            />
          </div>
        )}

        <div className="inputs">
          <img src={email_icon} alt="" />
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            required
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="inputs">
          <img src={password_icon} alt="" />
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            required
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
      </div>
      {/* <div className="forgot_password">Forgot password<span>Click here</span></div> */}
      {error && <div className="error">{error}</div>}
      <div className="signin-buttons">
        <div
          className={action === "Sign Up" ? "submit" : "submit grey"}
          onClick={handleSignUp}
        >
          Sign Up
        </div>
        <div
          className={action === "Login" ? "submit" : "submit grey"}
          onClick={handleLogin}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
