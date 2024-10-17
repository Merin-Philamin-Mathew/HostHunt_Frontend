import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminGetPropertiesService, loginAdminService } from "./adminService";
import {  setAdminsData } from "./adminSlice";

export const adminLogin = createAsyncThunk('adminLogin', async({email,password,user_type}, thunkAPI)=>{
    try{
        console.log("entered thunk");
        const response = await loginAdminService({email,password,user_type})
        console.log("response thunk",response);
        return response.data;
    }catch (error){
        console.log(error.response.data.error,'//adminloginAction//',error.message,error.response);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})



export const adminGetProperties = createAsyncThunk('adminGetUsers',async (thunkAPI) =>{
    try {
        const response = await adminGetPropertiesService();
        console.log('adminGetProperties:responsethunk...',response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})