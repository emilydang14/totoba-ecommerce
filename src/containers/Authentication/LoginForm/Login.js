import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/AuthActions";
//
import { formConfigs } from "../../../datas/form_configs";
import { validationMethod } from "../../../ultilities/validation_method";
//
import Input from "../../../components/UI/FormInput/FormInput";
import Button from "../../../components/UI/Button/Button";
import FormFrame from "../../../components/UI/FormFrame/FormFrame";
import Spinner from "../../../components/UI/Spinner/Spinner";

//signUpLink
const Login = (props) => {
  const [logInForm, setLogInForm] = useState({ ...formConfigs.log_in });
  const [formIsValid, setFormIsValid] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.onSignIn(logInForm.email.value, logInForm.password.value);
  };

  const inputChangeHandler = (e, id) => {
    //
    const updatedForm = { ...logInForm };
    const updatedElement = { ...updatedForm[id] };
    //
    updatedElement.value = e.target.value;
    updatedElement.touched = true;
    updatedElement.valid = validationMethod(
      updatedElement.value,
      updatedElement.validation
    );
    //
    updatedForm[id] = updatedElement;
    //
    let formIsValid = true;
    for (let id in updatedForm) {
      formIsValid = updatedForm[id].valid && formIsValid;
    }
    //
    setLogInForm(updatedForm);
    setFormIsValid(formIsValid);
    console.log(formIsValid);
  };

  let formArray = [];
  for (let key in logInForm) {
    formArray.push({
      id: key,
      configs: logInForm[key],
    });
  }

  const form = (
    <form onSubmit={formSubmitHandler}>
      {formArray.map((element) => (
        <Input
          key={element.id}
          label={element.configs.label}
          elementType={element.configs.elementType}
          elementConfig={element.configs.elementConfig}
          value={element.configs.value}
          onChange={(e) => inputChangeHandler(e, element.id)}
          inValid={!element.configs.valid}
          shouldValidate={element.configs.validation}
          touched={element.configs.touched}
          validationError={element.configs.validationError}
        />
      ))}
      <Button
        clicked={formSubmitHandler}
        btnName="Log In"
        disabled={!formIsValid}
      />
    </form>
  );

  const logInMessage = props.signInErr ? (
    props.signInErr.code === "auth/user-not-found" ? (
      <p>The email you provided haven't yet been registered.</p>
    ) : (
      <p>You entered wrong password.</p>
    )
  ) : (
    <p>Please enter your email and password</p>
  );

  let renderForm = (
    <FormFrame>
      <h1 className={classes.header}>Log In</h1>
      {props.loading ? <p>Login Succesfull. Please Wait</p> : logInMessage}
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          {props.isAuth && <Redirect to="/account" />}
          {form}
          <p className={classes.forgot}>
            <Link to="/account/authentication/login/forgot-password">
              Forgot your password?
            </Link>
          </p>
          <p>
            New to TOTOBa?{" "}
            <span>
              <Link to="/account/authentication/sign-up">Sign Up here</Link>
            </span>
          </p>
        </>
      )}
    </FormFrame>
  );

  return renderForm;
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user !== null,
    signInErr: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (email, password) => dispatch(actions.SignIn(email, password)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
