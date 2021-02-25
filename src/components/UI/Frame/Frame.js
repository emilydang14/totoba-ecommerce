import React from "react";
import classes from "./Frame.module.css";

const Frame = (props) => {
  return <div className={classes.Frame}>{props.children}</div>;
};

export default Frame;
