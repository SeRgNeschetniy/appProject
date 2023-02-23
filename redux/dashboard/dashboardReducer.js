import { createSlice } from "@reduxjs/toolkit";

const state = {
  posts: [],
  userPosts: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: state,
  reducers: {
    getPosts: (state, { payload }) => {
      state.posts = payload;
    },
    getUserPosts: (state, { payload }) => {
      state.userPosts = payload;
    },
    createPost: (state, { payload }) => {
      state.posts.unshift(payload);
      state.userPosts.unshift(payload);
    },
  },
});
