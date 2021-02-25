import React from "react";
import classes from "./Pagenotfound.module.css";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <div className={classes.Pagenotfound}>
      <h1>Page is being underdevelopment</h1>
      <Link to="/">
        <p>Back to Homepage</p>
      </Link>
    </div>
  );
};

export default Pagenotfound;
