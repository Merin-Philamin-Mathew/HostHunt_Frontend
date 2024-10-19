import { createAsyncThunk } from "@reduxjs/toolkit";
import { ownerAddPropertyDetails } from "./PropertyServices";

export const ownerAddProperties = createAsyncThunk('adminGetUsers',async (thunkAPI) =>{
    try {
        const response = await ownerAddPropertyDetails();
        console.log('ownerAddPropertyDetails:responsethunk...',response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})