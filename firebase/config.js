import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCijS-BCG2OUfGl3VbFHu-jw9apYIDu6lc",
  authDomain: "rn-social-9764a.firebaseapp.com",
  projectId: "rn-social-9764a",
  storageBucket: "rn-social-9764a.appspot.com",
  messagingSenderId: "192116284795",
  appId: "1:192116284795:web:7e0cf6cb7ff18517f0f1de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
