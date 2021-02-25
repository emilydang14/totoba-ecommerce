import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../UI/Logo/Logo";
import ToToBaLogo from "../../assets/logos/totoba.svg";
import MenuIcon from "../../assets/logos/menu.svg";
import classes from "./NavigationBar.module.css";
import NavItems from "./NavItems/NavItems";
import NavBarButtonContainer from "./NavItems/NavBarButtonContainer/NavBarButtonContainer";
import PromotionBar from "./PromotionBar/PromotionBar";

class NavigationBar extends Component {
  state = { prevScrollpos: window.pageYOffset, visible: true };

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos >= currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible,
    });
  };

  render() {
    return (
      <div
        className={`${classes.NavigationContainer} ${
          !this.state.visible && classes.hidden
        }`}
      >
        <div className={classes.NavigationBar}>
          <div onClick={this.props.showMenu} className={classes.menuIcon}>
            <img src={MenuIcon} alt="Menu" />
          </div>
          <div className={classes.smallMobileOnly}>
            <Link to="/">
              <Logo imgSrc={ToToBaLogo} alt="TOTOBa." />
            </Link>
          </div>
          <nav className={classes.desktopOnly}>
            <NavItems />
          </nav>
          <div className={classes.navButtons}>
            <NavBarButtonContainer />
          </div>
        </div>
        <PromotionBar />
      </div>
    );
  }
}

export default NavigationBar;
