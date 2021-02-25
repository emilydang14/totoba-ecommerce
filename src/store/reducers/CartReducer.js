import * as actionTypes from "../actions/actionTypes";
import ProductCollections from "../../datas/productCollections";

const initialState = {
  cart: [],
  cartQty: 0,
  subtotal: 0,
  error: false,
  order_ongoing: false,
};

const getAllProducts = () => {
  const productArrays = ProductCollections.map(
    (collection) => collection.collectionProducts
  );

  // flattens arrays of arrays into arrays
  return [].concat.apply([], productArrays);
};

const getCollectionName = (productID) => {
  const productCollection = ProductCollections.find((collection) => {
    return collection.collectionProducts.find(
      (collectionProduct) => collectionProduct.productID === productID
    );
  });
  return productCollection.collectionName;
};
const getCartQty = (cart) => {
  let cartQty = 0;
  if (cart.length !== 0) {
    cartQty = cart
      .map((cartItem) => {
        return cartItem.productQty;
      })
      .reduce((a, b) => a + b);
  }
  return cartQty;
};

// const getProductQty = (productID, cart) => {
//   return cart.find((cartItem) => cartItem.productID === productID).productQty;
// };

const generateFullDataForNewProductInCart = (productID) => {
  const allProducts = getAllProducts();
  const chosenproductDataFromSource = allProducts.find(
    (product) => product.productID === productID
  );
  const chosenproductCollection = getCollectionName(productID);
  return {
    ...chosenproductDataFromSource,
    collectionName: chosenproductCollection,
    productQty: 1,
  };
};

const subtotalCalculation = (cart) => {
  const allProducts = getAllProducts();
  let subtotal = [0];
  if (cart.length !== 0) {
    subtotal = cart.map((cartItem) => {
      const product = allProducts.find(
        (product) => product.productID === cartItem.productID
      );
      return cartItem.productQty * product.productPrice;
    });
  }
  return subtotal.reduce((sum, nextProduct) => sum + nextProduct);
};

const addProductToCart = (currentState, action) => {
  //step 1: check if the newAddedProduct is aldready in the cart
  let addedProductIsAldreadyInCart = false;
  if (
    currentState.cart.find((product) => product.productID === action.productID)
  )
    addedProductIsAldreadyInCart = true;

  //step2: duplicate the cart
  const updatedCart = [...currentState.cart];
  //step 3: update the product to the duplicated cart
  if (addedProductIsAldreadyInCart) {
    ///find index of the current product in Cart
    const productIndex = updatedCart.findIndex(
      (product) => product.productID === action.productID
    );
    ///update the qty of the product in the product object

    updatedCart[productIndex] = {
      ...updatedCart[productIndex],
      productQty: updatedCart[productIndex].productQty + 1,
    };
  } else {
    const newProductObject = generateFullDataForNewProductInCart(
      action.productID
    );
    updatedCart.push(newProductObject);
  }
  //
  const updatedSubtotal = subtotalCalculation(updatedCart);
  //
  const updatedCartQty = getCartQty(updatedCart);
  //
  return {
    ...currentState,
    cart: updatedCart,
    cartQty: updatedCartQty,
    order_ongoing: true,
    subtotal: updatedSubtotal,
  };
};

const increaseProductQty = (currentState, action) => {
  const updatedCart = [...currentState.cart];
  const productIndex = updatedCart.findIndex(
    (product) => product.productID === action.productID
  );
  updatedCart[productIndex] = {
    ...updatedCart[productIndex],
    productQty: updatedCart[productIndex].productQty + 1,
  };

  const updatedSubtotal = subtotalCalculation(updatedCart);
  const updatedCartQty = getCartQty(updatedCart);
  return {
    ...currentState,
    cart: updatedCart,
    subtotal: updatedSubtotal,
    cartQty: updatedCartQty,
    order_ongoing: true,
  };
};

const decreaseProductQty = (currentState, action) => {
  const updatedCart = [...currentState.cart];
  const productIndex = updatedCart.findIndex(
    (product) => product.productID === action.productID
  );

  updatedCart[productIndex] = {
    ...updatedCart[productIndex],
    productQty: updatedCart[productIndex].productQty - 1,
  };

  if (updatedCart[productIndex].productQty === 0) {
    updatedCart.splice(productIndex, 1);
  }

  const updatedSubtotal = subtotalCalculation(updatedCart);
  const updatedCartQty = getCartQty(updatedCart);
  return {
    ...currentState,
    cart: updatedCart,
    subtotal: updatedSubtotal,
    cartQty: updatedCartQty,
    order_ongoing: true,
  };
};

const removeProductFromCart = (currentState, action) => {
  const updatedCart = [...currentState.cart];
  const productIndex = updatedCart.findIndex(
    (product) => product.productID === action.productID
  );

  updatedCart.splice(productIndex, 1);

  const updatedSubtotal = subtotalCalculation(updatedCart);
  const updatedCartQty = getCartQty(updatedCart);
  return {
    ...currentState,
    cart: updatedCart,
    subtotal: updatedSubtotal,
    cartQty: updatedCartQty,
    order_ongoing: true,
  };
};

//
const cartReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      return addProductToCart(currentState, action);
    case actionTypes.INCREASE_PRODUCT_QUANTITY:
      return increaseProductQty(currentState, action);
    case actionTypes.DECREASE_PRODUCT_QUANTITY:
      return decreaseProductQty(currentState, action);
    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      return removeProductFromCart(currentState, action);
    default:
      return currentState;
  }
};

export default cartReducer;
