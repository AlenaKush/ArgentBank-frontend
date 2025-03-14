import { createSlice } from "@reduxjs/toolkit";

// Initial state for user details
const initialState = {
  user: null, // Stores user details
};

// Creating user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Save user details after login
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Update user profile
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    // Clear user data on logout
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setUser, updateUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
