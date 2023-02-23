import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { uploadImageToServer } from "../../services/uploadImageToServer";
import { dashboardSlice } from "./dashboardReducer";

const { getPosts, createPost, getUserPosts } = dashboardSlice.actions;

export const getAllPosts = () => async (dispath, getState) => {
  const querySnapshot = await getDocs(collection(db, "posts"));

  const arr = [];
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  dispath(getPosts(arr));
};

export const getAllUserPosts = (userId) => async (dispath, getState) => {
  //   const { userId } = useSelector((state) => state.auth);
  const q = query(collection(db, "posts"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const arr = [];
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });

  dispath(getUserPosts(arr));
};

export const createPostUser =
  ({ post }) =>
  async (dispath, getState) => {
    console.log("post---", post);
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...post,
      });

      dispath(createPost({ ...post, id: docRef.id }));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
