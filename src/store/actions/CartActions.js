import * as actionTypes from "./actionTypes";

export const addProductToCart = (productID) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    productID: productID,
  };
};
export const increaseProductQty = (productID) => {
  return {
    type: actionTypes.INCREASE_PRODUCT_QUANTITY,
    productID: productID,
  };
};
export const decreaseProductQty = (productID) => {
  return {
    type: actionTypes.DECREASE_PRODUCT_QUANTITY,
    productID: productID,
  };
};
export const removeProductFromCart = (productID) => {
  return {
    type: actionTypes.REMOVE_PRODUCT_FROM_CART,
    productID: productID,
  };
};
