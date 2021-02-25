import React, { useEffect } from "react";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavItem from "../NavItems/Navitem/NavItem";
import Logo from "../../UI/Logo/Logo";
import ToToBaLogo from "../../../assets/logos/totoba.svg";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  const { closed } = props;
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closed();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close); //important, to remove the event listener when the components is unmounted
  }, [closed]);

  let attachedClasses = [classes.Sidebar, classes.Closed];
  if (props.open) {
    attachedClasses = [classes.Sidebar, classes.Open];
  }

  return (
    <Aux>
      <Backdrop backdropClicked={props.closed} show={props.open} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <NavLink to="/">
          <Logo imgSrc={ToToBaLogo} alt="TOTOBa." />
        </NavLink>

        <nav className={classes.navItems}>
          <NavItem link="/" exact>
            Home
          </NavItem>
          <NavItem link="/our-products" exact>
            Our Products
          </NavItem>
          <NavItem link="/our-story" exact>
            Our Story
          </NavItem>
        </nav>
      </div>
    </Aux>
  );
};

export default Sidebar;
