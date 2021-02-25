import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../ultilities/updateObjectMethod";

const initialState = {
  user: null,
  error: null,
  loading: false,
  signUpSucess: null,
};

//SIGN_UP
const SignUpStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
    signUpSucess: null,
  });
};

const SignUpSuccess = (state) => {
  return updateObject(state, {
    error: null,
    loading: false,
    signUpSucess: true,
  });
};

const ResetStateAfterSignUp = (state) => {
  return updateObject(state, {
    error: null,
    loading: false,
    signUpSucess: null,
  });
};

const SignUpFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    signUpSucess: false,
  });
};

//SIGN_IN
const SignInStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
    signUpSucess: null,
  });
};

const SignInSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    error: null,
    loading: false,
    signUpSucess: null,
  });
};

const SignInFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    signUpSucess: null,
  });
};

//SIGN_OUT

const SignOutStart = (state) => {
  return updateObject(state, { loading: true, error: null });
};
const SignOutSuccess = (state) => {
  return updateObject(state, {
    user: null,
    error: null,
    loading: false,
    signUpSucess: null,
  });
};

const SignOutFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    signUpSucess: null,
  });
};

export const AuthReducer = (currentState = initialState, action) => {
  switch (action.type) {
    //
    case actionTypes.SIGNUP_START:
      return SignUpStart(currentState);
    case actionTypes.SIGNUP_SUCCESS:
      return SignUpSuccess(currentState, action);
    case actionTypes.SIGNUP_FAIL:
      return SignUpFail(currentState, action);
    case actionTypes.RESET_STATE_AFTER_SIGNUP_SUCCESS:
      return ResetStateAfterSignUp(currentState);

    //
    case actionTypes.SIGNIN_START:
      return SignInStart(currentState);
    case actionTypes.SIGNIN_SUCCESS:
      return SignInSuccess(currentState, action);
    case actionTypes.SIGNIN_FAIL:
      return SignInFail(currentState, action);
    //
    case actionTypes.SIGNOUT_START:
      return SignOutStart(currentState);
    case actionTypes.SIGNOUT_SUCCESS:
      return SignOutSuccess(currentState, action);
    case actionTypes.SIGNOUT_FAIL:
      return SignOutFail(currentState, action);
    //
    default:
      return currentState;
  }
};
