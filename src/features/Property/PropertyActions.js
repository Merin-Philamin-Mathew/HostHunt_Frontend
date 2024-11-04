import { toast } from 'react-toastify';
import { addingPoliciesAndServices, getAllAmenitiesService } from "./PropertyServices";

// export const ownerAddProperties = createAsyncThunk('adminGetUsers',async (thunkAPI) =>{
//     try {
//         const response = await ownerAddPropertyDetails();
//         console.log('ownerAddPropertyDetails:responsethunk...',response.data);
//         return response.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.error)
//     }
// })

export const handlePolicyAndServicesSubmit_Newlisting = async (values, setSubmitting) => {
    let errorMessage = 'Failed to save policies'; // Default error message

    try {
        console.log('Submitting policies:', values.property_id);

        const response = await addingPoliciesAndServices(values.property_id, values);
        console.log('rsponse.....mm',response.data);
        
        if (response.status === 200 || response.status === 201) {
            localStorage.setItem('policiesData', JSON.stringify(values));
            toast.success('Policies saved successfully');
        } else {
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        console.error('Error saving policies:', error.response.data);

        if (error.response?.data) {
            // Check for specific fields in the error response
            if (error.response.data.amenity_name) {
                errorMessage = error.response.data.amenity_name[0] || errorMessage;
            } else if (error.response.data.non_field_errors) {
                errorMessage = error.response.data.non_field_errors.join(', ') || errorMessage;
            } else {
                // Flatten the values and join all error messages
                errorMessage = Object.values(error.response.data).flat().join(', ') || errorMessage;
            }
        }

        // Display the constructed error message
        toast.error(errorMessage);
    } finally {
        setSubmitting(false);
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
