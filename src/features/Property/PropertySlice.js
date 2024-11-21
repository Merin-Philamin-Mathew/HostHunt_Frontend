// propertySlice.js
import { createSlice } from "@reduxjs/toolkit";



const propertySlice = createSlice({
    name: 'property',
    initialState: {
      isPropertyDetailsComplete: false,
      isDocumentsComplete: false,
      isPolicyServiceComplete: false,
      isPropertyAmenitiesComplete: false,
      isRoomDetails: false,

      allPropertyResults: []
    },
    reducers: {
      setPropertyDetailsComplete: (state, action) => {
        state.isPropertyDetailsComplete = action.payload;
      },
      setDocumentsComplete: (state, action) => {
        state.isDocumentsComplete = action.payload;
        
      },
      setPolicyServiceComplete: (state, action) => {
        state.isPolicyServiceComplete = action.payload;
      },
      setPropertyAmenitiesComplete: (state, action) => {
        state.isPropertyAmenitiesComplete = action.payload;
      },
      setRoomDetailsComplete: (state, action) => {
        state.isRoomDetails = action.payload;
      },
      setAllPropertyResults: (state, action) => {
        state.allPropertyResults = action.payload;
      }
    },
  });
  
  export const {
    setPropertyDetailsComplete,
    setDocumentsComplete,
    setPolicyServiceComplete,
    setPropertyAmenitiesComplete,
    setAllPropertyResults,
    setRoomDetailsComplete
  } = propertySlice.actions;
  
  export default propertySlice.reducer;