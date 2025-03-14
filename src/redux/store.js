import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // Handles authentication (token)
    user: userReducer, // Handles user data
  },
});
