// adminSlice.js
import { createSlice } from "@reduxjs/toolkit";
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
    activeItem: 'dashboard', // New property for active sidebar item
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetAdminActions: (state) => {
            state.error = '';
            state.loading = false;
            state.message = '';
            state.success = '';
        },
        logoutAdmin: (state) => {
            console.log("sdklfjdslfjdslfjdsl",state.adminAToken);
            
            state.adminData = null;
            state.adminAToken = null;
            state.usersData = null;
            state.propertiesData = null;
            state.success = false;
            state.error = '';
            state.loading = false;
            state.message = '';
            state.activeItem = 'dashboard'; // Reset active item on logout
        },
        setAdminsData: (state, action) => {
            state.adminData = action.payload?.data;
            state.adminAToken = action.payload?.admin_access_token;
        },
        setActiveItem: (state, action) => { // New action for setting active item
            state.activeItem = action.payload;
        },
        updateAdminAccessToken: (state, action) => {
            if (state.adminData) {
              state.adminAToken = action.payload;
            }
            
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.adminData = action.payload.data;
                state.adminAToken = action.payload.access;
                state.success = true;
                state.message = 'Admin logged in successfully!';
            })
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                console.log('adminloginrejected', action);
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetAdminActions, logoutAdmin, setAdminsData, setActiveItem, updateAdminAccessToken } = adminSlice.actions;

export default adminSlice.reducer;
