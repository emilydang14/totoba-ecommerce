import classes from "./Backdrop.module.css";
import React from "react";

const Backdrop = (props) => {
  return (
    props.show && (
      <div className={classes.Backdrop} onClick={props.backdropClicked}>
        {props.children}
      </div>
    )
  );
};

export default Backdrop;
