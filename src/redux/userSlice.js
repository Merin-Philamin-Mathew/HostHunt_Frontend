// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';


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
    updateAccessToken: (state, action) => {
      if (state.user) {
        state.user.access = action.payload;
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.userLoggedIn = false
      state.userProPic = null;
    },
  },
});

export const { setUserDetails, 
            updateUseruserProPic, 
            updateAccessToken, 
            logoutUser } = userSlice.actions;

export default userSlice.reducer;