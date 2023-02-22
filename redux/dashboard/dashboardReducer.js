import { createSlice } from "@reduxjs/toolkit";

const state = {
  posts: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: state,
  reducers: {
    getPosts: (state, { payload }) => ({
      posts: payload,
    }),
  },
});
