import {createSlice} from "@reduxjs/toolkit";
import { adminLogin } from "./adminActions";


const initialState = {
    adminData: null,
    adminAToken: null,

    usersData: null,
    propertiesData: null,
    bookings: null,

    success: false,
    error: '',
    loading: false,
    message: '',
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        resetAdminActions:(state)=>{
            state.error = ''
            state.loading = false
            state.message = ''
            state.success = ''
        },
        logoutAdmin:(state) => {
            state.adminData = null
            state.adminAToken = null
            state.usersData = null
            state.propertiesData = null
            state.success = false
            state.error = ""
            state.loading = false
            state.message = ''
        },
        setAdminsData:(state,action)=>{
            state.adminData = action.payload?.data
            state.adminAToken = action.payload?.admin_access_token
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.loading = false
            state.adminData = action.payload.data
            state.adminAToken = action.payload.access
            state.success = true
            state.message = 'Admin logged in successfully!'
        })
        .addCase(adminLogin.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            console.log('adminloginrejected',action);
            state.loading = false
            state.error = action.payload?.reasons
        })
      
        // // logout
        // .addCase(adminLogout.fulfilled,(state,action)=>{
        //     console.log('adminLoggedoutfull',action)
        //     state.message = action.payload.message
        //     state.loading = false
        // })
        // .addCase(adminLogout.pending,(state)=>{
        //     state.loading = true
        // })
        // .addCase(adminLogout.rejected,(state,action)=>{
        //     console.log('adminlogoutrej',action);
        //     state.error = action.payload?.reasons
        //     state.loading = false
        // })
        // // getusers
        // .addCase(adminGetUsers.fulfilled,(state,action)=>{
        //     console.log('admingetUsersfullfilled',action)
        //     state.usersData = action.payload.usersData
        //     state.loading = false
        // })
        // .addCase(adminGetUsers.pending,(state)=>{
        //     state.loading = true
        // })
        // .addCase(adminGetUsers.rejected,(state,action)=>{
        //     console.log('getusersrejected',action)
        //     // state.error = action.payload?.reasons
        //     //fill after consoling
        //     state.loading = false
        // })
        // // getproperties
        // .addCase(adminGetProperties.fulfilled,(state,action)=>{
        //     console.log('getpropertiesfull',action);
        //     state.propertiesData = action.payload
        //     state.loading = false
        // })
        // .addCase(adminGetProperties.pending, (state)=>{
        //     state.loading = true
        // })
        // .addCase(adminGetProperties.rejected, (state,action)=>{
        //     console.log('getPropertiesReject',action)
        //     // state.error = action.payload?.reasons
        //     // console and complete
        //     state.loading = false
        // })
    }
})


export const {resetAdminActions, logoutAdmin, setAdminsData} = adminSlice.actions

export default adminSlice.reducer