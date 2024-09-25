// // redux/ownerSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// // let owner_data = JSON.parse(localStorage.getItem('owner_data'))
// // console.log('owner',owner_data)

// const initialState = {
//   owner: owner_data || null,
//   profilePicture: null,
//   isLoggedIn:  false
// };

// const ownerSlice = createSlice({
//   name: 'owner',
//   initialState,
//   reducers: {
//     setownerDetails: (state, action) => {
//       state.owner = action.payload;
//       state.isLoggedIn = true
//     },
//     updateownerProfilePicture: (state, action) => {
//       state.profilePicture = action.payload;
//     },
//     logout: (state) => {
//       state.owner = null;
//       state.isLoggedIn = false
//       state.profilePicture = null;
//       localStorage.removeItem('owner_data')
//       localStorage.removeItem('owner_access_token')
//       localStorage.removeItem('owner_refresh_token')
//     },
//   },
// });

// export const { setownerDetails, updateownerProfilePicture, logout } = ownerSlice.actions;

// export default ownerSlice.reducer;