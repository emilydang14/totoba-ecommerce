import React from "react";
import classes from "./FormFrame.module.css";

const FormFrame = (props) => {
  return <div className={classes.formFrame}>{props.children}</div>;
};

export default FormFrame;
