import * as actionTypes from "./actionTypes";

const PaymentStart = (data) => {
  return {
    type: actionTypes.PAYMENT_START,
    payment_data: data,
    payment_inProcess: true,
    payment_error: null,
  };
};

const PaymentSuccess = () => {
  return {
    type: actionTypes.PAYMENT_SUCCESS,
    payment_data: null,
    payment_inProcess: false,
    payment_error: null,
  };
};
const PaymentFail = (error) => {
  return {
    type: actionTypes.PAYMENT_FAIL,
    payment_data: null,
    payment_inProcess: false,
    payment_error: error,
  };
};

export const Payment = (payment_data) => {
  return async (dispatch) => {
    dispatch(PaymentStart(payment_data));
    dispatch(PaymentSuccess());
  };
};
