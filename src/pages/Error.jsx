import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <h1 style={{ color: "red" }}>
      Wrong URL. <Link to="/">Home Page</Link>
    </h1>
  );
};
export default Error;
