import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdminService } from "./adminService";
import { logoutAdmin, setAdminsData } from "./adminSlice";
import { toast } from "react-toastify";

export const adminLogin = createAsyncThunk('adminLogin', async({email,password,user_type}, thunkAPI)=>{
    try{
        console.log("entered thunk");
        const response = await loginAdminService({email,password,user_type})
        console.log("response thunk",response);
        return response.data;
    }catch (error){
        console.log(error.response.data.error,'//adminloginAction//',error.message,error.response);
            // if (e.response) {
            //         const { status } = e.response;
            //         if (status === 403) {
            //             toast.error('Access Denied: User is not an admin.');
            //         } else if (status === 404) {
            //             toast.error('User not found.');
            //         } else if (status === 401) {
            //             toast.error('Incorrect password.');
            //         } else {
            //             toast.error('An error occurred. Please try again.');
            //         }
            //     } else {
            //         toast.error('An unexpected error occurred. Please try again later.');
            //     }
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})