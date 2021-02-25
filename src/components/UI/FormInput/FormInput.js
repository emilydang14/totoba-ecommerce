import classes from "./FormInput.module.css";
import React from "react";

//props: elementType,elementConfig(in "select" is an array), value, onChange,
// props: isValid, shouldValidate, touched - useState

const FormInput = (props) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];

  if (props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  let validationError = null;

  if (props.inValid && props.touched) {
    validationError = (
      <p className={classes.validationError}>{props.validationError}!</p>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.onChange}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default FormInput;
