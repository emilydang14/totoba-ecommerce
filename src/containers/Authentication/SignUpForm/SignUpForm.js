import React, { useState } from "react";
import classes from "./SignUpForm.module.css";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../../../store/actions/AuthActions";
import { connect } from "react-redux";
//
import { formConfigs } from "../../../datas/form_configs";
import { validationMethod } from "../../../ultilities/validation_method";
//
import Aux from "../../../hoc/Aux";
import Input from "../../../components/UI/FormInput/FormInput";
import Button from "../../../components/UI/Button/Button";
import FormFrame from "../../../components/UI/FormFrame/FormFrame";
import Spinner from "../../../components/UI/Spinner/Spinner";

//signUpLink
const SignUp = (props) => {
  const [SignUpForm, setSignUpForm] = useState({ ...formConfigs.sign_up });
  const [formIsValid, setFormIsValid] = useState(false);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.onSignUp(SignUpForm.email.value, SignUpForm.password.value);
  };

  const inputChangeHandler = (e, id) => {
    //
    const updatedForm = { ...SignUpForm };
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
    setSignUpForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  let formArray = [];
  for (let key in SignUpForm) {
    formArray.push({
      id: key,
      configs: SignUpForm[key],
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
      <Button btnName="Sign Up" disabled={!formIsValid} />
    </form>
  );

  const onSignUpForm = (
    <Aux>
      <h1 className={classes.header}>Sign Up</h1>
      <p>{props.signUpErr !== null ? props.signUpErr.message : ""}</p>
      {form}
      <p>
        Aldready has an account?{" "}
        <Link to="/account/authentication/login">Back to Login </Link>
      </p>
    </Aux>
  );
  let renderForm = (
    <FormFrame>{props.loading ? <Spinner /> : onSignUpForm}</FormFrame>
  );

  return props.signUpSucess ? (
    <FormFrame>
      <p>Sign Up Succesfully!</p>
      <p>Please check your email for verification.</p>
      <p>This page will automatically re-direct to homepage in 3s</p>
      <Link to="/account/authentication/login">
        <p onClick={() => props.onActionAfterSignUpSuccess()}>Back to Login</p>
      </Link>
      <Link to="/">
        <p onClick={() => props.onActionAfterSignUpSuccess()}>
          Back to Homepage
        </p>
      </Link>
    </FormFrame>
  ) : (
    renderForm
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user !== null,
    signUpErr: state.auth.error,
    loading: state.auth.loading,
    signUpSucess: state.auth.signUpSucess,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (email, password) => dispatch(actions.SignUp(email, password)),
    onActionAfterSignUpSuccess: () =>
      dispatch(actions.ResetStateAfterSignUpSuccess()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
