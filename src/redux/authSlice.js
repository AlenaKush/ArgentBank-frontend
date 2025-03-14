import { createSlice } from "@reduxjs/toolkit";

// Initial state of Redux store
const initialState = {
  token: localStorage.getItem("token") || null,
};

// Creating a slice
const authSlice = createSlice({
  name: "auth", // Slice's name
  initialState,  // Initial state
  reducers: {
    // User successfully logs in
    loginSuccess: (state, action) => {
      state.token = action.payload.token; // Save token in state
      localStorage.setItem("token", state.token); // Save token in localStorage
    },
    // Logout: Clear user data and remove token
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
});

// Export actions to be used in components
export const { loginSuccess, logout } = authSlice.actions;
// Export the reducer to be added to store.js
export default authSlice.reducer;
