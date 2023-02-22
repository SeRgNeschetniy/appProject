import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { dashboardSlice } from "./dashboardReducer";

const { getPosts } = dashboardSlice.actions;

export const getAllPosts = () => async (dispath, getState) => {
  const querySnapshot = await getDocs(collection(db, "posts"));

  const arr = [];
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  dispath(getPosts(arr));
};
