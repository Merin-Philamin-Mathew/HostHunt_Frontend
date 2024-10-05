// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

let user_data = JSON.parse(localStorage.getItem('user_data'))
console.log('user',user_data)

const initialState = {
  user: user_data || null,
  userproPic: null,
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
    updateUseruserproPic: (state, action) => {
      state.userproPic = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false
      state.userproPic = null;
      localStorage.removeItem('user_data')
      localStorage.removeItem('user_access_token')
      localStorage.removeItem('user_refresh_token')
    },
  },
});

export const { setUserDetails, updateUseruserproPic, logout } = userSlice.actions;

export default userSlice.reducer;