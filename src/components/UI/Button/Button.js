import React from "react";
import classes from "./Button.module.css";
//props: clicked, btnName, disabled
const Button = (props) => {
  return (
    <button
      onClick={props.clicked}
      className={classes.Button}
      disabled={props.disabled}
      style={{ margin: props.btnMargin }}
    >
      {props.btnName}
    </button>
  );
};

export default Button;
