import React from "react";
import NavItem from "./Navitem/NavItem";
import classes from "./NavItems.module.css";

const NavItems = () => {
  return (
    <ul className={classes.NavItems}>
      <NavItem link="/our-products" exact>
        Our Products
      </NavItem>
      <NavItem link="/our-story" exact>
        Our Story
      </NavItem>
    </ul>
  );
};

export default NavItems;
