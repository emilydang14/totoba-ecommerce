import React from "react";
import classes from "./Cart.module.css";
//
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
//
import CartItems from "./CartItems/CartItems";
import Button from "../../components/UI/Button/Button";
import Aux from "../../hoc/Aux";
import EmptyCart from "../../assets/logos/empty_cart.svg";
const Cart = (props) => {
  let cart = <p>Something went wrong. Can't fetch data for your cart</p>;
  if (props.cart.length === 0) {
    cart = (
      <div className={classes.emptyCart}>
        <img className={classes.emptyCartImg} src={EmptyCart} alt="" />
        <p>Your cart is empty</p>
        <p>
          {"< "}
          <Link style={{ color: "inherit" }} to="/our-products">
            Continue Shopping
          </Link>
        </p>
      </div>
    );
  } else {
    const checkoutHandler = () => {
      props.history.push("/checkout");
    };

    cart = (
      <Aux>
        <h1>Shopping Cart</h1>
        <CartItems cartItemsData={props.cart} />
        <div className={classes.cartSummary}>
          <p>
            {"<"}
            <Link className={classes.link} to="/our-products">
              Continute Shopping
            </Link>
          </p>
          <div className={classes.cartSubtotal}>
            <p> Subtotal: </p>
            <p style={{ fontWeight: "600", fontSize: "larger" }}>
              €{props.subtotal.toFixed(2)}
            </p>
          </div>
        </div>
        <div className={classes.checkOut}>
          <Button clicked={checkoutHandler} btnName="Checkout" />
        </div>
      </Aux>
    );
  }

  return <div className={classes.Cart}>{cart}</div>;
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    subtotal: state.cart.subtotal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIncreaseQty: (productID) =>
      dispatch(actions.increaseProductQty(productID)),
    onDecreaseQty: (productID) =>
      dispatch(actions.decreaseProductQty(productID)),
    onRemoveProduct: (productID) =>
      dispatch(actions.removeProductFromCart(productID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
