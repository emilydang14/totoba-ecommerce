import classes from "./Logo.module.css";
import React from "react";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img className={classes.logoImg} src={props.imgSrc} alt={props.alt} />
    </div>
  );
};

export default Logo;
