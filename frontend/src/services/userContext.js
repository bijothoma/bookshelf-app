import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userName, setName] = useState(localStorage.getItem("userName") || "");
  const [tokenValue, setToken] = useState(localStorage.getItem("token") || '');

  const setUser = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };
  const setUserName = (name) => {
    localStorage.setItem("userName", name);
    setName(name);
  };
  const setTokenValue = (token) => {
    localStorage.setItem("token", token);
    setToken(token)
  }

  return (
    <UserContext.Provider value={{ userId, userName, tokenValue, setUser, setUserName, setTokenValue }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
