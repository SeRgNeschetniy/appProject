import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const authSignUpUser =
  ({ email, password, nickname, avatar }) =>
  async (dispath, getState) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.error("error.code", error.code);
        console.error("error.message", error.message);
      });
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispath, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.error("error.code", error.code);
        console.error("error.message", error.message);
      });
  };

export const authSignOutUser = () => async (dispath, getState) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.error("error.code", error.code);
      console.error("error.message", error.message);
    });
};
