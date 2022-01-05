import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJc4QvzcBaqWCcWCcIuECov9tkZYObTfk",
  authDomain: "react-native-app-b7549.firebaseapp.com",
  databaseURL: "https://react-native-app-b7549.firebaseio.com",
  storageBucket: "react-native-app-b7549.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase;