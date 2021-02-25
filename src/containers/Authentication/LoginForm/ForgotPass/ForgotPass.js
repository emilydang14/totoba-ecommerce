import React, { useState } from "react";
import { Link } from "react-router-dom";
//
import { formConfigs } from "../../../../datas/form_configs";
import { validationMethod } from "../../../../ultilities/validation_method";
//
import Input from "../../../../components/UI/FormInput/FormInput";
import Button from "../../../../components/UI/Button/Button";
import FormFrame from "../../../../components/UI/FormFrame/FormFrame";
const ForgotPass = () => {
  const [forgotPassForm, setForgotPassForm] = useState({
    ...formConfigs.forgot_password,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const formSubmitHandler = () => console.log("login");

  const inputChangeHandler = (e, id) => {
    //
    const updatedForm = { ...forgotPassForm };
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
    setForgotPassForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  let formArray = [];
  for (let key in forgotPassForm) {
    formArray.push({
      id: key,
      configs: forgotPassForm[key],
    });
  }

  const form = (
    <form onSubmit={formSubmitHandler}>
      {formArray.map((element) => {
        return (
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
        );
      })}
      <Button
        clicked={formSubmitHandler}
        btnName="Submit"
        disabled={!formIsValid}
      />
    </form>
  );

  return (
    <FormFrame>
      <h2>Forgot your password?</h2>
      {form}

      <p>
        <Link to="/account/authentication/login">Back to Login</Link>
      </p>
    </FormFrame>
  );
};

export default ForgotPass;
