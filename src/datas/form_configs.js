export const formConfigs = {
  log_in: {
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      label: "Email Address",
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      validationError: "Please enter your correct email address",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password",
      },
      label: "Password",
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      validationError: "Password must contain at least 6 characters",
    },
  },
  forgot_password: {
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      label: "Email Address",
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      validationError: "Please enter your correct email address",
    },
  },
  sign_up: {
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      label: "Email Address",
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      validationError: "Please enter your correct email address",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password",
      },
      label: "Password",
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      validationError: "Password must contain at least 6 characters",
    },
    // repeat_password: {
    //   elementType: "input",
    //   elementConfig: {
    //     type: "password",
    //     placeholder: "Enter your password again",
    //   },
    //   label: "Repeat Password",
    //   value: "",
    //   validation: {
    //     required: true,
    //     samePassword: false,
    //   },
    //   valid: false,
    //   touched: false,
    //   validationError: "Password is not the same",
    // },
  },
  shipping_information: {
    fname: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ex: Emily",
      },
      label: "First Name",
      value: "",
      validation: {
        required: true,
        isEmail: false,
      },
      valid: false,
      touched: false,
      validationError: "Please enter your first name",
    },
    lname: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ex: Järvelä",
      },
      label: "Last Name",
      value: "",
      validation: {
        required: true,
        isEmail: false,
      },
      valid: false,
      touched: false,
      validationError: "Please enter your last name",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "ex: customerservice@totoba.fi",
      },
      label: "Email Address",
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      validationError: "Please enter your correct email address",
    },
    phone_number: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ex: 4 5256 5463",
      },
      label: "Phone Number",
      value: "",
      validation: {
        required: true,
        isEmail: false,
        isNumber: true,
        minLength: 9,
        maxLength: 10,
      },
      valid: false,
      touched: false,
      validationError: "Please enter your correct phone number",
    },
    streetAddress: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ex: Kuntokatu 3 B45",
      },
      label: "Address",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      validationError: "Please enter your correct street address",
    },
    postalCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ex: 33520",
      },
      label: "Postal Code",
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumber: true,
      },
      valid: false,
      touched: false,
      validationError: "Please enter your correct postal code",
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ex: Tampere",
      },
      label: "City",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "FI",
            displayValue: "Finland",
          },
        ],
      },
      label: "Country",
      value: "Finland",
      validation: {},
      touched: false,
      valid: true,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "Fast shipping (est. 2 - 3 working days)",
            displayValue: "Fast shipping (est. 2 - 3 working days)",
          },
          {
            value: "Normal shipping (est. 4 - 5 working days)",
            displayValue: "Normal shipping (est. 4 - 5 working days)",
          },
        ],
      },
      label: "Delivery Methods",
      value: "Normal shipping (est. 4 - 5 working days)",
      validation: {},
      touched: false,
      valid: true,
    },
  },
};
