// redux/ownerSlice.js
import { createSlice } from '@reduxjs/toolkit';

// let owner_data = JSON.parse(localStorage.getItem('owner_data'))
// console.log('owner',owner_data)

const initialState = {
  owner: null,
  ownerproPic: null,
  ownerLoggedIn:  false
};

const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    setownerDetails: (state, action) => {
      state.owner = action.payload;
      state.ownerLoggedIn = true
    },
    updateownerownerproPic: (state, action) => {
      state.ownerproPic = action.payload;
    },
    logoutOwner: (state) => {
      state.owner = null;
      state.ownerLoggedIn = false
      state.ownerproPic = null;
    },
  },
});

export const { setownerDetails, updateownerownerproPic, logoutOwner } = ownerSlice.actions;

export default ownerSlice.reducer;