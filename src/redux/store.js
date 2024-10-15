// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import ownerReducer from './ownerSlice'; 
import adminReducer from './admin/adminSlice'

import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';



const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  owner: ownerReducer,
  admin: adminReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;