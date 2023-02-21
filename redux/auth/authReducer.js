import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  nickname: null,
  email: null,
  avatar: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      email: payload.email,
    }),
    authStateChage: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
