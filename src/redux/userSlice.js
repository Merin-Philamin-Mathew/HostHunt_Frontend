// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

let user_data = JSON.parse(localStorage.getItem('user_data'))

const initialState = {
  isLoggedIn: false,
  user: user_data || null,
  profilePicture: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    updateUserProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.profilePicture = null;
    },
  },
});

export const { setUserDetails, updateUserProfilePicture, logout } = userSlice.actions;

export default userSlice.reducer;