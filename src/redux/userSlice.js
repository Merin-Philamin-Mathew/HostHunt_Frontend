// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// let user_data = JSON.parse(localStorage.getItem('user_data'))
// console.log('user',user_data)

const initialState = {
  user:  null,
  userProPic: null,
  userLoggedIn:  false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      state.userLoggedIn = true
    },
    updateUseruserProPic: (state, action) => {
      state.userProPic = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.userLoggedIn = false
      state.userProPic = null;
    },
  },
});

export const { setUserDetails, updateUseruserProPic, logoutUser } = userSlice.actions;

export default userSlice.reducer;