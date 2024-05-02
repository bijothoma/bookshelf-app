import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/userContext";

const Logout = () => {
  const navigate = useNavigate();
  const { userName, setUserName } = useUser();
  useEffect(() => {
    localStorage.removeItem("userId");
    navigate("/dashboard");
    setUserName("");
  }, []);
  return <div>logout</div>;
};

export default Logout;
