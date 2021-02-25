import React from "react";
import classes from "./OurStory.module.css";
import { Link } from "react-router-dom";
const OurStory = () => {
  return (
    <div>
      Our Story
      <div className={classes.Pagenotfound}>
        <h1>Page is being underdevelopment</h1>
        <Link to="/">
          <p>Back to Homepage</p>
        </Link>
      </div>
    </div>
  );
};

export default OurStory;
