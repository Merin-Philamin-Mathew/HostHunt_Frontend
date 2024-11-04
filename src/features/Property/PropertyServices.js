import { api } from "../../apis/axios";
import URLS from "../../apis/urls";



export const getAllAmenitiesService = () =>{
  return api.get(URLS.ADMINMANAGEMENT.pc_amenities,)
}


//===================== NEW_LISTING =============================
export const getAllPropertiesOfHost =() =>{
    return api.get(URLS.HOSTMANAGEMENT['host_properties'])
}

export const getAllDocumentsofProperty =(property_id) =>{
  return api.get(`${URLS.NEWLISTING['property_documents']}/${property_id}/`)
}
// policies and serivices
export const addingPoliciesAndServices = (property_id,values) => {
  const url = URLS.NEWLISTING['policies_services'].replace('{property_id}', property_id);
  return api.patch(url,values);
};
export const getPoliciesByProperty = (property_id) =>{
    return api.get(`${URLS.HOSTMANAGEMENT['policies_by_property']}/${property_id}/`) 
}

export const reviewAndSubmitSteps_ChangeStatus = (property_id,status) =>{
    return api.post(`${URLS.NEWLISTING['submit_review']}/${property_id}/${status}/`);
}



// =============================== ONBOARDING ==============================================
// Rental Appartments
export const createRentalApartmentDetails = (data) =>{
    return api.post(URLS.ONBOARDING['rental_appartement'],data)
}
// Rooms  
export const createRoomDetails = (data) =>{
    return api.post(URLS.ONBOARDING['rooms'],data)
} //same api for get and create
export const getRoomDetails_Onboarding = (data) =>{
    return api.get(URLS.ONBOARDING['rooms'],data) //getting by property_id which can be sent with the data
}
export const updateRoomDetails_Onboarding = () =>{
  return api.put(`${URLS.ONBOARDING['rooms']}/${room_id}/`)
}
export const deleteRoomDetails_Onboarding = () =>{
  return api.put(`${URLS.ONBOARDING['rooms']}/${room_id}/`)
}

export const getAllRoomsByProperty = (property_id) =>{
    return api.get(`${URLS.HOSTMANAGEMENT['room_by_property']}/${property_id}/`) //getting by property_id which can be sent with the data
}