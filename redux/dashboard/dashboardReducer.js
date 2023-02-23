import { createSlice } from "@reduxjs/toolkit";

const state = {
  posts: [],
  userPosts: [],
  comments: [],
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
    getComments: (state, { payload }) => {
      state.comments = payload;
    },
    addComment: (state, { payload }) => {
      state.comments.unshift(payload);
    },
  },
});
