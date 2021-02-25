import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../ultilities/updateObjectMethod";

const initialState = {
  payment_cus_data: null, //{contact_info: {email, phone},shipping_info: {} }
  payment_subtotal: null,
  payment_orderData: null, //{stripe_clientSecret: , payment_method_id,line_items: , shipping_method:}
  payment_inProcess: false,
  payment_error: null,
};

const PaymentStart = (state, action) => {
  return updateObject(state, {
    payment_data: action.payment_data,
    payment_inProcess: true,
    payment_error: null,
  });
};
const PaymentSuccess = (state) => {
  return updateObject(state, {
    payment_inProcess: false,
    payment_error: null,
    payment_data: null,
  });
};
const PaymentFail = (state, action) => {
  return updateObject(state, {
    payment_inProcess: false,
    payment_error: action.error,
  });
};

export const PaymentReducer = (currentState = initialState, action) => {
  switch (action.type) {
    //
    case actionTypes.PAYMENT_START:
      return PaymentStart(currentState);
    case actionTypes.PAYMENT_SUCCESS:
      return PaymentSuccess(currentState, action);
    case actionTypes.PAYMENT_FAIL:
      return PaymentFail(currentState, action);
    default:
      return currentState;
  }
};
