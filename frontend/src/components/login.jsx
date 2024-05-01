import React, { useEffect, useState } from "react";
import person_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import axios from "axios";
import "../styles/login.css";
import { useUser } from "../services/userContext";

const Login = () => {
  const { userId, setUser } = useUser();
  const { userName, setUserName } = useUser();
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
    if (data.email === "") return;
    try {
      const url = `${process.env.REACT_APP_RENDER_PATH}/api/auth`;
      const { data: res } = await axios.post(url, {
        email: data.email,
        password: data.password,
      });
      if (!res.data) {
        console.log(res.message);
      } else {
        localStorage.setItem("userData", res.data);
        setUser(res.data._id);
        setUserName(res.data.name);
        window.location.href = "/";
      }
    } catch (error) {
      setError(error.response);
      resetData();
      document.getElementById("name").focus();
    }
  };
  const handleSignUp = async () => {
    setAction("Sign Up");
    setError("");
    if (data.email === "") return;
    try {
      const url = `${process.env.REACT_APP_RENDER_PATH}/api/users`;
      const { data: res } = await axios.post(url, data).then(res => {
        setAction("Login");
        resetData();
      });
      
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        resetData();
        document.getElementById("name").focus();
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
          <div className="inputs" style={{ marginTop:"20px" }}>
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
