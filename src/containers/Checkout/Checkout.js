//
import React, { useEffect, useState } from "react";
import classes from "./Checkout.module.css";
//
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

//
import ContactDataForm from "./ContactDataForm/ContactDataForm";
import arrow from "../../assets/logos/arrow2.svg";

//
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
//

const Checkout = (props) => {
  const [shippingInfo, setShippingInfo] = useState(null);
  const [redirectToCheckOut, setRedirectToCheckOut] = useState(false);

  useEffect(() => {
    props.cart.length === 0 && props.history.push("/cart");
  });
  useEffect(() => {
    redirectToCheckOut && redirectToCheckoutHandler();
  }, [redirectToCheckOut]);
  // functions
  const createDesiredLineItems = (item) => {
    return {
      // price_data: {
      //   currency: "eur",
      //   product_data: {
      //     name: item.productName,
      //     description: "Belongs to" + item.collectionName,
      //     images: item.productImg,
      //   },
      //   unit_amount: 1,
      // },
      amount: Math.round(item.productPrice * 100),
      currency: "eur",
      name: item.productName,
      quantity: item.productQty,
    };
  };

  const createDesiredCheckOutData = () => {
    const customer_email =
      props.user === null ? shippingInfo.email : props.user.email;
    let line_items = [];
    props.cart.map((item) => {
      return line_items.push(createDesiredLineItems(item));
    });
    const address =
      shippingInfo.streetAddress +
      " " +
      shippingInfo.postalCode +
      " " +
      shippingInfo.city +
      " Finland";

    const checkOutData = {
      customer_email: customer_email,
      currency: "EUR",
      line_items: line_items,
      // metadata: {
      //   customer_contact_info: {
      //     fname: shippingInfo.fname,
      //     lname: shippingInfo.lname,
      //     email: shippingInfo.email,
      //     phone_number: shippingInfo.phone_number,
      //     address: address,
      //   },
      // delivery_method: shippingInfo.deliveryMethod,
      //},
    };
    console.log("[Checkout.js]CreateDesiredCheckOutData Function return", {
      checkOutData,
    });
    return checkOutData;
  };

  const redirectToCheckoutHandler = async () => {
    const stripe = await stripePromise;
    let sessionId;
    const checkOutData = createDesiredCheckOutData();
    return await fetch(
      "https://us-central1-totoba-2daa8.cloudfunctions.net/createCheckOutSession",
      {
        method: "POST",
        body: JSON.stringify(checkOutData), // Adding the order data to payload
      }
    )
      .then((response) => {
        console.log("[Checkout.js] fetch method POST from Firebase Function", {
          response,
        });
        return response.json();
      })
      .then((data) => {
        console.log("[Checkout.js] fetch method POST from Firebase Function", {
          data,
        });
        // Getting the session id from firebase function

        var body = JSON.parse(data.body);
        console.log("fetch create checkout session", body);

        return body.sessionId;
      })
      .then(async (sessionId) => {
        // Redirecting to payment form page
        console.log("session id before redirect to checkout", sessionId);
        await stripe
          .redirectToCheckout({
            sessionId,
          })
          .then((result) => {
            console.log(
              "[Checkout.js] stripe redirecttocheckout result",
              result
            );
            return result.error.message;
          })
          .catch((err) =>
            console.log("[Checkout.js] stripe redirecttocheckout err", err)
          );
      });
  };
  const formClickedContinueHandler = (e, orderForm) => {
    console.log("[Checkout.js] On form click cont");
    e.preventDefault();
    setShippingInfo(
      Object.keys(orderForm).reduce((object, key) => {
        return { ...object, [key]: orderForm[key].value };
      }, {})
    );
    setRedirectToCheckOut(true);
  };

  //sub-components
  const orderSummary = (
    <div className={classes.checkOutItems}>
      <h3>- Order Summary -</h3>
      <div className={classes.checkOutItems_header}>
        <p>Product</p>
        <p>Total</p>
      </div>
      {props.cart.map((item) => {
        return (
          <div key={item.productID} className={classes.checkOutItem}>
            <div className={classes.checkOutItem_product}>
              <img src={item.productImg} alt={item.productName + " img"} />
              <div className={classes.checkOutItem_product_productInfo}>
                <p>{item.productName}</p>
                <p>{"€" + item.productPrice + " * " + item.productQty}</p>
              </div>
            </div>
            <div className={classes.checkOutItem_totalPerProduct}>
              {Math.round(item.productPrice * item.productQty)}
            </div>
          </div>
        );
      })}
      <div className={classes.checkOutItems_summary}>
        <table className={classes.subtotalTable}>
          <tbody>
            <tr>
              <th>Shipping cost: </th>
              <td>FREE SHIPPING</td>
            </tr>

            <tr>
              <th>Subtotal: </th>
              <td>
                <span className={classes.checkOutItems_summary_totalPrice}>
                  {Math.round(props.subtotal)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className={classes.CheckOut}>
      <h1>Check Out</h1>
      <p style={{ textAlign: "center" }}>2/3</p>
      <img className={classes.arrowImg} src={arrow} alt="." />
      {orderSummary}
      <img className={classes.arrowImg} src={arrow} alt="." />
      <p style={{ textAlign: "center" }}>2/3</p>
      <ContactDataForm onFormClickedContinue={formClickedContinueHandler} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    subtotal: state.cart.subtotal,
    isAuth: state.auth.user !== null,
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
