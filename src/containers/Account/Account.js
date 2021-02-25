import React from "react";
import classes from "./Account.module.css";
import * as actions from "../../store/actions/AuthActions";
//
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//
import Aux from "../../hoc/Aux";
import Button from "../../components/UI/Button/Button";

const Account = (props) => {
  // if (!props.isAuth) {
  //   props.history.push("/account/authentication/login");
  // }

  const userInfo = props.isAuth ? (
    <Aux>
      <h1>Account Page</h1>
      <div className={classes.cusInfo}>
        <table>
          <tbody>
            <tr>
              <th>Email: </th>
              <td>{props.user.email}</td>
            </tr>
            <tr>
              <th>Customer ID: </th>
              <td>{props.user.uid}</td>
            </tr>
            <tr>
              <th>Number of Orders Completed:</th>
              <td>unknown</td>
            </tr>
            <tr>
              <th>Number of Orders in Process:</th>
              <td>unknown</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Order History</h2>
      <Button btnName="Log Out" clicked={() => props.onSignOut()} />
      <Link to="/">
        <p>Back to Homepage</p>
      </Link>
    </Aux>
  ) : (
    <Redirect to="/account/authentication/login" />
  );

  return <div className={classes.Account}>{userInfo}</div>;
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user !== null,
    user: state.auth.user,
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(actions.SignOut()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
