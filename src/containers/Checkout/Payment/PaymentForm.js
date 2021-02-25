import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
//
import Button from "../../../components/UI/Button/Button";
import classes from "./PaymentForm.module.css";

//Stripe:
//Step 1: createPayment Method => payment_method.id
//ref: https://stripe.com/docs/api/payment_intents/confirm
//Step 2: action: createPaymentIntent {amount, currency, customer(if logged in),
//metadata :(line_items, shipping_method),payment_method(id),receipt_email},
//shipping: {address: {line1, city, country(FI - countrycode),postal_code},
//name, phone} => get clientSecret
//check again step 3 from : https://stripe.com/docs/js/payment_intents/confirm_card_payment
//Step 3: action: confirmCardPayment => use clientSecret
//stripe.confirmCardPayment("PaymentIntent", {object})
//object: {payment_method(id),shipping(in paymentIntent),receipt_email}

const Payment = (props) => {
  const [cardComplete, setCardComplete] = useState(false);
  const [error, setError] = useState();
  const [paymentMethodID, setPaymentMethodID] = useState();
  //
  const stripe = useStripe();
  const elements = useElements();
  //

  const orderConfirmationHandler = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    //create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      console.log("[error]", error);
      setError(error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setPaymentMethodID(paymentMethod.id);
      setError(null);
    }
    //create payment intent
    const paymentIntents = await axios.post("/api/stripe/payment_intents", {
      amount: props.subtotal * 100,
      currency: "eur",
      payment_method: { id: paymentMethodID },
      // receipt_email,
      // metadata,
    });

    console.log("paymentform, pmintents", paymentIntents);
  };
  return (
    <div className={classes.Payment}>
      <h3>- Pay with card -</h3>
      <form
        className={classes.form}
        onSubmit={(e) => orderConfirmationHandler(e)}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                fontFamily: "Courier Prime, monospace",
                color: "#6c6859",
                "::placeholder": {
                  color: "#6c6859",
                },
                iconColor: "#ff5f00",
                backgroundColor: "f7f8f4",
              },
              invalid: {
                color: "#ff5f00",
              },
            },
          }}
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
        <div className={classes.errorMess}>
          <p>{!error ? " " : error.message}</p>
        </div>
        <Button
          btnMargin="15px 0 0 0"
          btnName="Buy Now"
          disabled={!stripe || !elements}
        />
        <p>
          or{" "}
          <Link to="/cart" style={{ color: "inherit" }}>
            Back to cart
          </Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    subtotal: state.cart.subtotal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

//export default injectStripe(Payment);
