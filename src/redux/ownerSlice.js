// redux/ownerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// let owner_data = JSON.parse(localStorage.getItem('owner_data'))
// console.log('owner',owner_data)

const initialState = {
  owner: owner_data || null,
  // owner_name : owner_data['name'] || null,
  ownerproPic: null,
  isLoggedIn:  false
};

const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    setownerDetails: (state, action) => {
      state.owner = action.payload;
      state.isLoggedIn = true
    },
    updateownerownerproPic: (state, action) => {
      state.ownerproPic = action.payload;
    },
    logoutOwner: (state) => {
      state.owner = null;
      state.isLoggedIn = false
      state.ownerproPic = null;
      localStorage.removeItem('owner_data')
      localStorage.removeItem('owner_access_token')
      localStorage.removeItem('owner_refresh_token')
    },
  },
});

export const { setownerDetails, updateownerownerproPic, logoutOwner } = ownerSlice.actions;

export default ownerSlice.reducer;