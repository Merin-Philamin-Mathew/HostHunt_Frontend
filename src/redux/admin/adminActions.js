import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdminService } from "./adminService";
import { logoutAdmin, setAdminsData } from "./adminSlice";

export const adminLogin = createAsyncThunk('adminLogin', async({email,password}, thunkAPI)=>{
    try{
        const response = await loginAdminService({email,password})
        return response.data;
    }catch (error){
        console.log('adminloginAction',error.message);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})