// propertySlice.js
import { createSlice } from "@reduxjs/toolkit";
const propertySlice = createSlice({
  name: 'property',
  initialState: {
      isPropertyDetailsComplete: false,
      isDocumentsComplete: false,
      isPolicyServiceComplete: false,
      isPropertyAmenitiesComplete: false,

    // onboarding
      RoomDetails: '',
      RoomFacilities: [],
      RoomImages: [],
      allRoomByProperty: [],

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
    //   room details >> onboarding 
      setRoomDetails: (state, action) => {
          state.RoomDetails = action.payload;
      },
      setRoomFacilities: (state, action) => {
          state.RoomFacilities = action.payload;
      },
      setRoomImages: (state, action) => {
          state.RoomImages = action.payload;
      },
      setAllRoomsByProperty: (state, action) => {
          state.allRoomByProperty = action.payload;
      },
      deleteRoomById: (state, action) => {
        const idToDelete = action.payload;
        state.allRoomByProperty = state.allRoomByProperty.filter(room => room.id !== idToDelete);
      },
      addRoomToProperty: (state, action) => {
          state.allRoomByProperty.push(action.payload);
      },
      resetRoomForm: (state, action) => {
            state.RoomDetails        =  ''
            state.RoomFacilities     =  []
            state.RoomImages         =  ''
      },
 
      resetOnboardingDetails: (state, action) => {
          state.RoomDetails        =  ''
          state.RoomFacilities     =  []
          state.RoomImages         =  ''
          state.allRoomByProperty  =  []
          state.PropertyImages     =  []
      },
    
    // for displaying in the user side
      setAllPropertyResults: (state, action) => {
          state.allPropertyResults = action.payload;
      },
  }
});

export const {
  setPropertyDetailsComplete,
  setDocumentsComplete,
  setPolicyServiceComplete,
  setPropertyAmenitiesComplete,

  setRoomDetails,
  setRoomFacilities,
  setRoomImages,
  setAllRoomsByProperty,
  deleteRoomById,
  addRoomToProperty,
  resetRoomForm,
  resetOnboardingDetails,

  setAllPropertyResults,
} = propertySlice.actions;

export default propertySlice.reducer;
