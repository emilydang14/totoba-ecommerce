import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCpfzvFGxkxdbTCal_memoiWvZkCbvT5U4",
  authDomain: "totoba-2daa8.firebaseapp.com",
  databaseURL: "https://totoba-2daa8-default-rtdb.firebaseio.com",
  projectId: "totoba-2daa8",
  storageBucket: "totoba-2daa8.appspot.com",
  messagingSenderId: "887766947071",
  appId: "1:887766947071:web:26ef25be8be1deae6168ca",
  measurementId: "G-P1SH7G72RH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
const authentication = firebase.auth();
const Googleprovider = new firebase.auth.GoogleAuthProvider();

export { authentication, Googleprovider };
export default database;
