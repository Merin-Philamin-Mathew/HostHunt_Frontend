import { toast } from "sonner";
import { addingPoliciesAndServices, createAmenitiesByPropertyService, createRoomsService, deleteRoomDetailsService, getActiveBedTypes, getActiveRoomFacilities, getActiveRoomTypes, getAllAmenitiesService, getAllPropertyResults, getAmenitiesByPropertyService, getDetailedDisplay_property, getPoliciesByProperty } from "./PropertyServices";
import { addRoomToProperty, deleteRoomById, setAllPropertyResults, setAllRoomsByProperty, setPolicyServiceComplete, setPropertyAmenitiesComplete, setPropertyDetailsComplete } from './PropertySlice';


//===================================NEW LISTING=====================================

export const handlePolicyAndServicesSubmit_Newlisting = async (values, setSubmitting, dispatch, navigate) => {
    let errorMessage = 'Failed to save policies'; 

    try {
        console.log('Submitting policies:', values.property_id);

        const response = await addingPoliciesAndServices(values.property_id, values);
        console.log('rsponse.....mm',response.data);
        
        if (response.status === 200 || response.status === 201) {
            localStorage.setItem('policiesData', JSON.stringify(values));
            toast.success('Policies saved successfully');
            dispatch(setPolicyServiceComplete(true));
            navigate('/host/new-listing/facilities', {replace:true});
        } else {
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        console.error('Error saving policies:', error.response.data);

        if (error.response?.data) {
            if (error.response.data.amenity_name) {
                errorMessage = error.response.data.amenity_name[0] || errorMessage;
            } else if (error.response.data.non_field_errors) {
                errorMessage = error.response.data.non_field_errors.join(', ') || errorMessage;
            } else {
                errorMessage = Object.values(error.response.data).flat().join(', ') || errorMessage;
            }
        }
        toast.error(errorMessage);
    } finally {
        setSubmitting(false);
    }
};

export const fetchPolicies_ServicesByProperty = async (property_id) => {
    try{
        const policies = await getPoliciesByProperty(property_id)        
        localStorage.setItem('policiesData',JSON.stringify(policies.data))
      }
      catch(e){
        console.error(e.response.data.message||'An error occurred while fetching documents')
      }
};

// handle amenities
export const fetchAllAmenities = async () => {
    try{ 
        console.log('fetch amenities');
        const response = await getAllAmenitiesService()
        console.log('got amenities', response.data);
        return response.data
    }
    catch (error) {
        console.error('Error saving policies:', error.response.data);

        if (error.response?.data) {
            if (error.response.data.amenity_name) {
                errorMessage = error.response.data.amenity_name[0] || errorMessage;
            } else if (error.response.data.non_field_errors) {
                errorMessage = error.response.data.non_field_errors.join(', ') || errorMessage;
            } else {
                errorMessage = Object.values(error.response.data).flat().join(', ') || errorMessage;
            }
        }
    }
}

export const handlecreateAmenitiesByProperty_Newlisting = async(values,property_id,dispatch,navigate) => {
    try{
        console.log('data from create amenities',values,property_id);
        const response = await createAmenitiesByPropertyService(property_id,values)
        console.log('response of createAmenities by proeprty new listing ', response);
        dispatch(setPropertyAmenitiesComplete(true))
        localStorage.setItem('amenities', JSON.stringify(values));
        navigate('/host/new-listing/finish', {replace:true});
        toast.success('Amenities added successfully...')
    }catch(error){
        console.error(error);
    }
}

export const fetchAllAmenities_ByProperty = async(property_id) => {
try{
    const response = await getAmenitiesByPropertyService(property_id)
    const data = {
        amenities_ids: response.data.map(item => item.amenity_id),
        free: response.data.every(item => item.free)
      };   
    localStorage.setItem('amenities', JSON.stringify(data));
}
catch(error){
    console.error(error);
    
}
}

// ============================ ONBOARDING DETIALS =====================================================
export const createRooms = async (property_id, RoomDetails, RoomFacilities, RoomImages, dispatch) => {
    try {
        console.log('Preparing to send room details:', property_id, RoomDetails, RoomFacilities, RoomImages);

        // Initialize FormData
        const formData = new FormData();

        // Add Room Details
        const roomDetails = {
            ...RoomDetails,
            property: property_id,
            facilities: RoomFacilities
        };
        Object.entries(roomDetails).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => formData.append(key, v)); // For array fields like 'facilities'
            } else {
                formData.append(key, value);
            }
        });

        // Add Room Images
        RoomImages.forEach((image) => {
            if (image instanceof File) {
                formData.append('room_images', image); // Direct File object
            } else if (image.file instanceof File) {
                formData.append('room_images', image.file); // Extracted File object
            } else if (image.data_url) {
                const base64String = image.data_url.split(",")[1]; 
                const byteString = atob(base64String); 
                const mimeString = image.data_url.split(",")[0].split(":")[1].split(";")[0];
        
                const arrayBuffer = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) {
                    arrayBuffer[i] = byteString.charCodeAt(i);
                }
        
                const blob = new Blob([arrayBuffer], { type: mimeString });
                formData.append('room_images', new File([blob], `image.${mimeString.split("/")[1]}`, { type: mimeString }));
            } else {
                console.error(`Invalid image format`, image);
            }
        });
        

        // Send API request
        const response = await createRoomsService(formData);
        dispatch(addRoomToProperty(response.data));
        toast.success('New room is successfully added!')
        console.log("Response:", response);
        dispatch(resetRoomForm())
        return response.data;
    } catch (error) {
        
    if (error.response && error.response.data) {
        const errors = error.response.data.error; 
        console.error(error.response.data);
        
        if (typeof errors === 'object') {
            Object.keys(errors).forEach((key) => {
                const messages = errors[key];
                messages.forEach((msg) => {
                    // toast.error(`${key}: ${msg}`);
                    toast.error(`${msg}`);
                });
            });
        } else {
            // Handle non-field-specific errors
            toast.error(errors.toString());
        }
    } else {
        toast.error("An unexpected error occurred.");
    }
    }
};

export const deleteRooms = async (id,dispatch) => {
    try{
        const response = await deleteRoomDetailsService(id)
        dispatch(deleteRoomById(id))
    }
    catch (error){
        console.error(error);
        toast.error(error)
    }
}


//============================ FETCHING EXTRA DATAS=====================================
export const fetchActiveRoomTypes = async (setRoomTypes) => {
    try{ 
        console.log('fetch room types');
        const response = await getActiveRoomTypes()
        setRoomTypes(response.data)
        console.log('got room types', response.data);
        return response.data
    }
    catch (error) {
        console.error('Error saving policies:', error.response.data);
    }
}
export const fetchActiveBedTypes = async (setBedTypes) => {
    try{ 
        console.log('fetch bed types');
        const response = await getActiveBedTypes()
        setBedTypes(response.data)
        console.log('got bed types', response.data);
        return response.data
    }
    catch (error) {
        console.error('Error saving policies:', error.response.data);
    }
}
export const fetchActiveRoomFacilities = async (setFacilities) => {
    try{ 
        console.log('fetch room facilities');
        const response = await getActiveRoomFacilities()
        setFacilities(response.data)
        console.log('got room facilities', response.data);
        return response.data
    }
    catch (error) {
        console.error('Error saving policies:', error.response.data);
    }
}
// =================== User side property display ========================================
export const fetchAllPropertyResults = async(city,dispatch) => {
    try {
        const response = await getAllPropertyResults(city)
        console.log('all property results...',response,response.data);
        dispatch(setAllPropertyResults(response?.data))
        console.log('done');
        
    }
    catch(error){
        console.error(error)
    }
}
export const fetchDetailedDisplay_property = async(property_id,setPropertyDetails) => {
    try {
        const response = await getDetailedDisplay_property(property_id)
        console.log('detailed display',response,response.data);
        console.log('done',response.data);
        setPropertyDetails(response.data)
        
    }
    catch(error){
        console.error(error)
    }
}