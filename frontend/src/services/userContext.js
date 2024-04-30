import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userName, setName] = useState(localStorage.getItem("userName") || "");

  const setUser = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };
  const setUserName = (name) => {
    localStorage.setItem("userName", name);
    setName(name);
  };

  return (
    <UserContext.Provider value={{ userId, userName, setUser, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
