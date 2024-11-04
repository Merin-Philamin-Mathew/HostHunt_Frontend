import { createAsyncThunk } from "@reduxjs/toolkit";
import {  adminCreateAmenitiesService, adminCreateBedTypeService, adminCreateRoomFacilitiesService, adminCreateRoomTypeService, adminDeleteAmenityService, adminDeleteBedTypeService, adminDeleteRoomFacilityService, adminDeleteRoomTypeService, adminListAllAmenitiesService, adminListAllBedTypesService, adminListAllRoomFacilitiesService, adminListAllRoomTypesService, adminUpdateAmenityService, adminUpdateBedTypeService, adminUpdateRoomFacilityService, adminUpdateRoomTypeService, loginAdminService } from "./adminService";
import { toast } from "sonner";

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



// export const adminGetProperties = createAsyncThunk('adminGetUsers',async (thunkAPI) =>{
//     try {
//         const response = await adminGetPropertiesService();
//         console.log('adminGetProperties:responsethunk...',response.data);
//         return response.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.error)
//     }
// })

// ==============================PROPERTY CONFIGURATION===================================
// Amenities
export const Admin_fetchAllAmenities = async (setResponse, setLoading, page, searchQuery = '') => {
    setLoading(true);
    try {
        const res = await adminListAllAmenitiesService(page, searchQuery);
        console.log('Fetching amenities:', res.data);
        setResponse(res?.data);
    } catch (error) {
        console.error('Error fetching amenities:', error.response?.data);
    }
    setLoading(false);
};


export  const Admin_handleSaveAmenity = async (values, resetForm) => {
    try {
        await adminCreateAmenitiesService(values);
        console.log("Amenity saved successfully:", values);
        toast.success("Amenity saved successfully");
        resetForm();
        return values; 
    } catch (error) {
        console.error("Failed to save amenity", error.response?.data);
        const errorMessage =
            error.response?.data?.amenity_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to save amenity";
        toast.error(errorMessage);
        throw error; // Rethrowing the error for component to handle
    }
};

export  const Admin_handleUpdateAmenity = async (id,values) => {
    try {
        await adminUpdateAmenityService(id, values);
        console.log("Amenity saved successfully:", values);
        toast.success("Amenity Updated successfully");
        return values; 
    } catch (error) {
        console.error("Failed to save amenity", error.response?.data);
        const errorMessage =
            error.response?.data?.amenity_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to save amenity";
        toast.error(errorMessage);
        throw error; 
    }
};

export const Admin_handleDeleteAmenity = async (amenity_id) => {
 try {
     console.log('Amenity delete amenity',amenity_id);
    await adminDeleteAmenityService(amenity_id)
    toast.success('Amenity deleted successfully')
    return
 }
 catch(error){
    console.error("Failed to delete amenity...", error);
    const errorMessage =
    error.response?.data?.amenity_name?.[0] ||
    error.response?.data?.non_field_errors?.join(", ") ||
    "Failed to data amenity...";
    toast.error(errorMessage);
 }
} 

// Room Facilities

// RoomFacilities CRUD Operations
export const Admin_fetchAllRoomFacilities = async (setResponse, setLoading, page, searchQuery = '') => {
    setLoading(true);
    try {
        const res = await adminListAllRoomFacilitiesService(page, searchQuery);
        console.log('Fetching room facilities:', res.data);
        setResponse(res?.data);
    } catch (error) {
        console.error('Error fetching room facilities:', error.response?.data);
    }
    setLoading(false);
};

export const Admin_handleSaveRoomFacility = async (values, resetForm) => {
    try {
        await adminCreateRoomFacilitiesService(values);
        console.log("Room facility saved successfully:", values);
        toast.success("Room facility saved successfully");
        resetForm();
        return values;
    } catch (error) {
        console.error("Failed to save room facility", error.response?.data);
        const errorMessage =
            error.response?.data?.facility_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to save room facility";
        toast.error(errorMessage);
        throw error;
    }
};

export const Admin_handleUpdateRoomFacility = async (id, values) => {
    try {
        console.log(values,id,'update room facility');
        
        await adminUpdateRoomFacilityService(id, values);
        console.log("Room facility updated successfully:", values);
        toast.success("Room facility updated successfully");
        return values;
    } catch (error) {
        console.error("Failed to update room facility", error.response?.data);
        const errorMessage =
            error.response?.data?.facility_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to update room facility";
        toast.error(errorMessage);
        throw error;
    }
};

export const Admin_handleDeleteRoomFacility = async (facility_id) => {
    try {
        console.log('Deleting room facility:', facility_id);
        await adminDeleteRoomFacilityService(facility_id);
        toast.success('Room facility deleted successfully');
        return;
    } catch (error) {
        console.error("Failed to delete room facility...", error);
        const errorMessage =
            error.response?.data?.facility_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to delete room facility...";
        toast.error(errorMessage);
    }
};

// RoomType CRUD Operations
export const Admin_fetchAllRoomTypes = async (setResponse, setLoading, page, searchQuery = '') => {
    setLoading(true);
    try {
        const res = await adminListAllRoomTypesService(page, searchQuery);
        console.log('Fetching room types:', res.data);
        setResponse(res?.data);
    } catch (error) {
        console.error('Error fetching room types:', error.response?.data);
    }
    setLoading(false);
};

export const Admin_handleSaveRoomType = async (values, resetForm) => {
    try {
        await adminCreateRoomTypeService(values);
        console.log("Room type saved successfully:", values);
        toast.success("Room type saved successfully");
        resetForm();
        return values;
    } catch (error) {
        console.error("Failed to save room type", error.response?.data);
        const errorMessage =
            error.response?.data?.room_type_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to save room type";
        toast.error(errorMessage);
        throw error;
    }
};

export const Admin_handleUpdateRoomType = async (id, values) => {
    try {
        await adminUpdateRoomTypeService(id, values);
        console.log("Room type updated successfully:", values);
        toast.success("Room type updated successfully");
        return values;
    } catch (error) {
        console.error("Failed to update room type", error.response?.data);
        const errorMessage =
            error.response?.data?.room_type_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to update room type";
        toast.error(errorMessage);
        throw error;
    }
};

export const Admin_handleDeleteRoomType = async (room_type_id) => {
    try {
        console.log('Deleting room type:', room_type_id);
        await adminDeleteRoomTypeService(room_type_id);
        toast.success('Room type deleted successfully');
        return;
    } catch (error) {
        console.error("Failed to delete room type...", error);
        const errorMessage =
            error.response?.data?.room_type_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to delete room type...";
        toast.error(errorMessage);
    }
};

// BedType CRUD Operations
export const Admin_fetchAllBedTypes = async (setResponse, setLoading, page, searchQuery = '') => {
    setLoading(true);
    try {
        const res = await adminListAllBedTypesService(page, searchQuery);
        console.log('Fetching bed types:', res.data);
        setResponse(res?.data);
    } catch (error) {
        console.error('Error fetching bed types:', error.response?.data);
    }
    setLoading(false);
};

export const Admin_handleSaveBedType = async (values, resetForm) => {
    try {
        await adminCreateBedTypeService(values);
        console.log("Bed type saved successfully:", values);
        toast.success("Bed type saved successfully");
        resetForm();
        return values;
    } catch (error) {
        console.error("Failed to save bed type", error.response?.data);
        const errorMessage =
            error.response?.data?.bed_type_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to save bed type";
        toast.error(errorMessage);
        throw error;
    }
};

export const Admin_handleUpdateBedType = async (id, values) => {
    try {
        await adminUpdateBedTypeService(id, values);
        console.log("Bed type updated successfully:", values);
        toast.success("Bed type updated successfully");
        return values;
    } catch (error) {
        console.error("Failed to update bed type", error.response?.data);
        const errorMessage =
            error.response?.data?.bed_type_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to update bed type";
        toast.error(errorMessage);
        throw error;
    }
};

export const Admin_handleDeleteBedType = async (bed_type_id) => {
    try {
        console.log('Deleting bed type:', bed_type_id);
        await adminDeleteBedTypeService(bed_type_id);
        toast.success('Bed type deleted successfully');
        return;
    } catch (error) {
        console.error("Failed to delete bed type...", error);
        const errorMessage =
            error.response?.data?.bed_type_name?.[0] ||
            error.response?.data?.non_field_errors?.join(", ") ||
            "Failed to delete bed type...";
        toast.error(errorMessage);
    }
};
