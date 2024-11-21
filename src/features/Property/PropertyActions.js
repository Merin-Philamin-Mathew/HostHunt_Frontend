import { toast } from "sonner";
import { addingPoliciesAndServices, createAmenitiesByPropertyService, getActiveBedTypes, getActiveRoomTypes, getAllAmenitiesService, getAllPropertyResults, getAmenitiesByPropertyService, getPoliciesByProperty } from "./PropertyServices";
import { setAllPropertyResults, setPolicyServiceComplete, setPropertyAmenitiesComplete, setPropertyDetailsComplete } from './PropertySlice';


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