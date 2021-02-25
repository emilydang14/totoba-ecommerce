import React from "react";
import { connect } from "react-redux";
import classes from "./NavBarButtonContainer.module.css";
import CartIcon from "../../../../assets/logos/cart.svg";
import UserIcon from "../../../../assets/logos/user.svg";
import Aux from "../../../../hoc/Aux";
import { NavLink } from "react-router-dom";

const NavBarButtonContainer = (props) => {
  return (
    // <div className={classes.NavBarButtonContainer}>
    <Aux>
      <div className={classes.navBarButton}>
        <NavLink
          style={{
            textDecoration: "inherit",
            color: "inherit",
            textAlign: "center",
          }}
          activeClassName={classes.active}
          to="/cart"
        >
          <img className={classes.iconImg} src={CartIcon} alt="Cart" />
          <p className={classes.buttonName}>Cart({props.cartQty})</p>
        </NavLink>
      </div>
      <div className={classes.navBarButton}>
        <NavLink
          to={props.isAuth ? "/account" : "/account/authentication/login"}
          style={{
            textDecoration: "inherit",
            color: "inherit",
            textAlign: "center",
          }}
          activeClassName={classes.active}
        >
          <img className={classes.iconImg} src={UserIcon} alt="User" />
          <p className={classes.buttonName}>Account</p>
        </NavLink>
      </div>
    </Aux>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user !== null,
    cartQty: state.cart.cartQty,
  };
};

export default connect(mapStateToProps, null)(NavBarButtonContainer);
