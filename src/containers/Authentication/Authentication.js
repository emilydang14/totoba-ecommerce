import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//
import SignUp from "./SignUpForm/SignUpForm";
import ForgotPass from "./LoginForm/ForgotPass/ForgotPass";
import LogIn from "./LoginForm/Login";

const Authentication = (props) => {
  const route = (
    <Switch>
      <Route path="/account/authentication/sign-up" component={SignUp} />
      <Route
        path="/account/authentication/login/forgot-password"
        component={ForgotPass}
      />
      <Route path="/account/authentication/login" exact component={LogIn} />
    </Switch>
  );
  return <div>{route}</div>;
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user !== null,
    user: state.auth.user,
  };
};

export default withRouter(connect(mapStateToProps)(Authentication));
