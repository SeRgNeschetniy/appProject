import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { dashboardSlice } from "./dashboard/dashboardReducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [dashboardSlice.name]: dashboardSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
