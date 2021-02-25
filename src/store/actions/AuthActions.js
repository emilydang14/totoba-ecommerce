import * as actionTypes from "./actionTypes";
import { authentication } from "../../api/firebase/firebase";
import database from "../../api/firebase/firebase";

//side method
const getUserData = (user) => {
  return {
    uid: user.uid,
    refreshToken: user.refreshToken,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    registerDate: user.metadata.creationTime,
    lastSignIn: user.metadata.lastSignInTime,
  };
};

//SIGN_UP
export const SignUpStart = () => {
  return {
    type: actionTypes.SIGNUP_START,
  };
};

export const SignUpSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
  };
};

export const ResetStateAfterSignUpSuccess = () => {
  return {
    type: actionTypes.RESET_STATE_AFTER_SIGNUP_SUCCESS,
  };
};
export const SignUpFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: {
      code: error.code,
      message: error.message,
    },
  };
};
const postNewUserDataToFireStore = async (user) => {
  const userData = {
    user_information: {
      uid: user.uid,
      refreshToken: user.refreshToken,
      emailVerified: user.emailVerified,
      lastSignIn: user.metadata.lastSignInTime,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      registerDate: user.metadata.creationTime,
    },
    user_order_success: {},
    user_order_inCart: {},
  };
  return await database
    .collection("users")
    .doc(userData.user_information.email)
    .set(userData);
};

export const SignUp = (email, password) => {
  return async (dispatch) => {
    dispatch(SignUpStart());
    //create user with email and password
    authentication
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        await postNewUserDataToFireStore(res.user);
        await dispatch(SignUpSuccess());
      })
      .then(() => {
        authentication.currentUser.sendEmailVerification();
      })
      .catch((err) => {
        console.log("err when signup", err);
        dispatch(SignUpFail(err));
      });
    //update user data to database
  };
};

//SIGN_IN
export const SignInStart = () => {
  return {
    type: actionTypes.SIGNIN_START,
  };
};

export const SignInSuccess = (user) => {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    user,
  };
};
export const SignInFail = (error) => {
  return {
    type: actionTypes.SIGNIN_FAIL,
    error: {
      code: error.code,
      message: error.message,
    },
  };
};
const updateLogInData = async (user) => {
  const userData = database.collection("users").doc(user.email);
  return await userData.update({
    "user_information.refreshToken": user.refreshToken,
    "user_information.emailVerified": user.emailVerified,
    "user_information.lastSignIn": user.metadata.lastSignInTime,
  });
};

export const SignIn = (email, password) => {
  return (dispatch) => {
    dispatch(SignInStart());
    authentication
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        updateLogInData(res.user);
        const signInData = getUserData(res.user);
        await dispatch(SignInSuccess(signInData));
      })
      .catch((err) => {
        console.log("err when log in", err);
        dispatch(SignInFail(err));
      });
  };
};

//SIGN_OUT
export const SignOutStart = () => {
  return {
    type: actionTypes.SIGNOUT_START,
  };
};

export const SignOutSuccess = () => {
  return {
    type: actionTypes.SIGNOUT_SUCCESS,
  };
};
export const SignOutFail = (error) => {
  return {
    type: actionTypes.SIGNOUT_FAIL,
    error: {
      code: error.code,
      message: error.message,
    },
  };
};

export const SignOut = () => {
  return (dispatch) => {
    dispatch(SignOutStart());
    authentication
      .signOut()
      .then(() => {
        dispatch(SignOutSuccess());
      })
      .catch((err) => {
        console.log("err when signout", err);
        dispatch(SignOutFail(err));
      });
  };
};
