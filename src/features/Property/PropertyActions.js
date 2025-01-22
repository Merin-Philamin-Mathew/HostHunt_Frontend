import { toast } from "sonner";
import { addingPoliciesAndServices, createAmenitiesByPropertyService, createPropertyImagesService, createRoomsService, deletePropertyImageService, deleteRoomDetailsService, getActiveBedTypes, getActiveRoomFacilities, getActiveRoomTypes, getAllAmenitiesService, getAllPropertyResults, getAmenitiesByPropertyService, getDetailedDisplay_property, getPoliciesByProperty_Services, getPropertyImagesService, reviewAndSubmitSteps_ChangeStatus } from "./PropertyServices";
import { addRoomToProperty, deleteRoomById, resetRoomForm, setAllPropertyResults, setAllRoomsByProperty, setPolicyServiceComplete, setPropertyAmenitiesComplete, setPropertyDetailsComplete } from './PropertySlice';
import { api } from "@/apis/axios";


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
        console.log('policaties kedakkapore');
        const policies = await getPoliciesByProperty_Services(property_id)     
        console.log(policies,'policaties kedachach');
           
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
export const createRooms = async (property_id, RoomDetails, RoomFacilities, RoomImages, dispatch, setEnableSubmit) => {
    try {
        setEnableSubmit(false)
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
        dispatch(resetRoomForm())
        toast.success('New room is successfully added!')

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
                    toast.error(`For field ${key}: ${msg}`);
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
        toast.success('Room was successfully deleted!')
    }
    catch (error){
        console.error(error);
        toast.error(error)
    }
}


export const createPropertyImages = async (property_id, formData, setImageUrls,setImages)=> {
    try{
        console.log('dfdfdfdfdfdf');
        const response = await createPropertyImagesService(property_id, formData)
        toast.success(response.data.message)
        console.log(response.data);
        const data =  response.data.data_url
        setImages([])
        setImageUrls((prevImageUrls) => [...prevImageUrls, ...data]);
    }
    catch (error) {
        if (error) {
            console.log(error);
            
            const errorMessage = error
                ? error.response.data.error// Access the first error string in the array
                : 'An unknown error occurred';
            console.error('Error response:', errorMessage);
            toast.error(errorMessage);
        } else {
            console.error('Unexpected error:', error.message);
            toast.error('An unexpected error occurred');
        }
    }
}

export const fetchPropertyImages = async (property_id, setImage_urls, setThumbnail)=> {
    try{
        const response = await getPropertyImagesService(property_id)
        console.log('fetchPropertyImages',response.data);
        setImage_urls(response.data.property_images)
        setThumbnail(response.data.thumbnail_image_url)
    }
    catch(error){
        console.error(error)
        toast.error(error)
    }
}

// handle uploaded image
export const handleUploadedImageDelete = async (image_id, setImage_urls, image_urls) => {
    try{
        
        const response = await deletePropertyImageService(image_id)
        const updatedImageUrls = image_urls.filter((image) => image.id !== image_id);
        setImage_urls(updatedImageUrls);

    }
    catch(error){
        console.error(error)
        toast.error(error)
    }
}

export const handlePublishingProperty = async (property,navigate) => {
    try{
        const response = await reviewAndSubmitSteps_ChangeStatus(property,'published')
        localStorage.setItem('property_status','published');
        navigate('/host/manage-listings/',{replace:true});
        toast.success('Property has been published!')

    }
    catch(error){
        console.error(error)
        // toast.error(error)
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
        // dispatch(setAllPropertyResults(response?.data))
        console.log('done');
        
    }
    catch(error){
        console.error(error)
    }
}
export const fetchPropertyCardDetailsUserSide = async (property_ids) => {
    if (!property_ids || !property_ids.length) {
      return [];
    }
  
    try {
      const response = await api.post('/property/property-cards/', {
        property_ids: property_ids
      });
      
      if (!response?.data) {
        throw new Error('No data received from server');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching property cards:', error);
      throw error; // Re-throw to handle in component
    }
  };

  
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