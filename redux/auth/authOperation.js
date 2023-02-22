import { auth, storage } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { authSlice } from "./authReducer";
import { getDownloadURL, uploadBytes } from "firebase/storage";

const { updateUserProfile, authSignOut, authStateChage } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, nickname, avatar }) =>
  async (dispath, getState) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: nickname,
          //photoURL: avatar,
        })
          .then(() => {
            const { uid, displayName, email, photoURL } = auth.currentUser;

            dispath(
              updateUserProfile({
                userId: uid,
                nickname: displayName,
                email: email,
                avatar: photoURL,
              })
            );
          })
          .catch((error) => {
            console.error("error.code", error.code);
            console.error("error.message", error.message);
          });
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
        const { uid, displayName, email } = userCredential.user;
        dispath(
          updateUserProfile({
            userId: uid,
            nickname: displayName,
            email: email,
          })
        );
      })
      .catch((error) => {
        console.error("error.code", error.code);
        console.error("error.message", error.message);
      });
  };

export const authSignOutUser = () => async (dispath, getState) => {
  signOut(auth)
    .then(() => {
      dispath(authSignOut());
    })
    .catch((error) => {
      console.error("error.code", error.code);
      console.error("error.message", error.message);
    });
};

export const authStateChageUser = () => async (dispath, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispath(
        updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          email: user.email,
        })
      );
      dispath(authStateChage({ stateChange: true }));
    } else {
      console.error("error.code", error.code);
      console.error("error.message", error.message);
    }
  });
};
