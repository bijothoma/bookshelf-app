import React, { useEffect, useState } from "react";
import Login from "../components/login";
import CurrentlyReadingBooks from "../components/currently-reading-books";

const Dashboard = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("userData");
    setLogin(user ? true : false);
  }, []);
  return <div>{login === true ? <CurrentlyReadingBooks /> : <Login />}</div>;
};

export default Dashboard;
