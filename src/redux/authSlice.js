import { createSlice } from "@reduxjs/toolkit";

// Initial state of Redux store
const initialState = {
  user: null,
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
    // Store user details
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Logout: Clear user data and remove token
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
});

// Export actions to be used in components
export const { loginSuccess, setUser, logout, setRememberMe } = authSlice.actions;
// Export the reducer to be added to store.js
export default authSlice.reducer;
