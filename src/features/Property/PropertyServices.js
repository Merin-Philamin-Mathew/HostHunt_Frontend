import { api } from "../../apis/axios";
import URLS from "../../apis/urls";


export const getAllPropertiesOfHost =() =>{
    return api.get(URLS.HOSTMANAGEMENT['host_properties'])
}

export const getAllDocumentsofProperty =(property_id) =>{
  console.log('kkkkkllll');
  
  return api.get(`${URLS.NEWLISTING['property_documents']}/${property_id}/`)
}

// newlisting

export const reviewAndSubmitSteps_ChangeStatus = (property_id,status) =>{
    return api.post(`${URLS.NEWLISTING['submit_review']}/${property_id}/${status}/`);
}
// onboarding
export const createRentalApartmentDetails = (data) =>{
    return api.post(URLS.ONBOARDING['rental_appartement'],data)
}
export const createRoomDetails = (data) =>{
    return api.post(URLS.ONBOARDING['rooms'],data)
}
export const getRoomDetails = (data) =>{
    return api.get(URLS.ONBOARDING['rooms'],data) //getting by property_id which can be sent with the data
}
export const updateRoomDetails = () =>{
  return api.put(`${URLS.ONBOARDING['rooms']}/${room_id}/`)
}
export const deleteRoomDetails = () =>{
  return api.put(`${URLS.ONBOARDING['rooms']}/${room_id}/`)
}

// rooms by property
//ONBOARDING

export const getRoomsByProperty = (property_id) =>{
    return api.get(`${URLS.HOSTMANAGEMENT['room_by_property']}/${property_id}/`) //getting by property_id which can be sent with the data
}