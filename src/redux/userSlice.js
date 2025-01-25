// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { set } from 'date-fns';


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
    setProfile: (state, action) => {
      state.user.profile = action.payload;
    },
    setProfilePic: (state, action) => {
      state.user.profile_pic = action.payload;
    },
    setIdentificationDetails: (state, action) => {
      state.user.identity_verification = action.payload;
    },
  },
});

export const { setUserDetails, 
            updateUseruserProPic, 
            updateAccessToken, 
            logoutUser ,
            setProfile,
            setIdentificationDetails,
            setProfilePic
          } = userSlice.actions;

export default userSlice.reducer;