import React from "react";
import { Link } from "react-router-dom";

const ErrorElement = () => {
  return (
    <div
      style={{
        fontSize: "18px",
        margin: "0 auto",
        display: "flex",
        gap: "5px",
      }}
    >
      404 Page Not Found
      <Link to="/">Home</Link>
    </div>
  );
};

export default ErrorElement;
