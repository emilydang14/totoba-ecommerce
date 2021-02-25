import React from "react";
import CartItem from "./CartItem/CartItem";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const CartItems = (props) => {
  const cartItems = props.cartItemsData.map((cartItem) => (
    <CartItem
      key={cartItem.productID}
      productImg={cartItem.productImg}
      productName={cartItem.productName}
      collectionName={cartItem.collectionName}
      productQty={cartItem.productQty}
      productPrice={cartItem.productPrice}
      decreaseQty={() => props.onDecreaseQty(cartItem.productID)}
      increaseQty={() => props.onIncreaseQty(cartItem.productID)}
      removeItem={() => props.onRemoveProduct(cartItem.productID)}
    />
  ));

  return <div>{cartItems}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
