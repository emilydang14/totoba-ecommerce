import classes from "./Layout.module.css";
import React, { Component } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../NavigationBar/Sidebar/Sidebar";

class Layout extends Component {
  state = {
    showSidebar: false,
  };

  closedSideBarHandler = () => {
    this.setState({ showSidebar: false });
  };
  toggleMenuHandler = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <NavigationBar showMenu={this.toggleMenuHandler} />
        <Sidebar
          closed={this.closedSideBarHandler}
          open={this.state.showSidebar}
        />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
