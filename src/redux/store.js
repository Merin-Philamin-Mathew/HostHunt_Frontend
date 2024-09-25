// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
// import ownerReducer from './ownerSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    // owner: ownerReducer,  
  },
});

export default store;