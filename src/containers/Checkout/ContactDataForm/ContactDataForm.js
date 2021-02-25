import React, { useState } from "react";
//
import { formConfigs } from "../../../datas/form_configs";
import { validationMethod } from "../../../ultilities/validation_method";
//
import Input from "../../../components/UI/FormInput/FormInput";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactDataForm.module.css";

const ContactDataForm = (props) => {
  const [orderForm, setOrderForm] = useState({
    ...formConfigs.shipping_information,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (e, id) => {
    //
    const updatedForm = { ...orderForm };
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
    setOrderForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  let formArray = [];
  for (let key in orderForm) {
    formArray.push({
      id: key,
      configs: orderForm[key],
    });
  }

  const form = (
    <form onSubmit={(e) => props.onFormClickedContinue(e, orderForm)}>
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
      <Button btnName={"Continue"} disabled={!formIsValid} />
    </form>
  );

  return (
    <div className={classes.shippingInfo}>
      <h3>- Shipping Information -</h3>
      {form}
    </div>
  );
};

export default ContactDataForm;
