// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import ownerReducer from './ownerSlice'; 
import { combineReducers } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';



const rootReducer = combineReducers({
  user: userReducer,
  owner: ownerReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

const persistor = persistStore(store)

export default store;