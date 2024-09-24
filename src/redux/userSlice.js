// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

let user_data = JSON.parse(localStorage.getItem('user_data'))
console.log('user',user_data)

const initialState = {
  user: user_data || null,
  profilePicture: null,
  isLoggedIn:  false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true
    },
    updateUserProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false
      state.profilePicture = null;
      localStorage.removeItem('user_data')
      localStorage.removeItem('user_access_token')
      localStorage.removeItem('user_refresh_token')
    },
  },
});

export const { setUserDetails, updateUserProfilePicture, logout } = userSlice.actions;

export default userSlice.reducer;