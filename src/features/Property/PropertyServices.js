import { api } from "../../apis/axios";
import URLS from "../../apis/urls";



export const getAllAmenitiesService = () =>{
  return api.get(URLS.FETCHINGMANAGEMENT.hh_all_amenities,)
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
// property amenities
export const getAmenitiesByPropertyService = (property_id) => {
  const url = URLS.NEWLISTING['retrievORcreate_amenities_by_property'].replace('{property_id}',property_id)
  return api.get(url)
}
export const createAmenitiesByPropertyService = (property_id,values) => {
  console.log(property_id,values,'createAmentiesByPropertyService');  
  const url = URLS.NEWLISTING['retrievORcreate_amenities_by_property'].replace('{property_id}',property_id)
  return api.post(url,values)
}

export const updateAmenitiesByPropertyService = (property_id,values) => {

  console.log(property_id,values,'createAmentiesByPropertyService');  
  const url = URLS.NEWLISTING['create_amenities_by_property'].replace('{property_id}',property_id)
  return api.put(url,values)
}


// submit and review
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

// ================FETCHING DATAS===================
export const getActiveRoomTypes = () =>{
  return api.get(URLS.FETCHINGMANAGEMENT['hh_active_room_types'])
}
export const getActiveBedTypes = () =>{
  return api.get(URLS.FETCHINGMANAGEMENT['hh_active_bed_types'])
}


// =================== User side property display ========================================
export const getAllPropertyResults = (city) => {
  console.log(`Requesting properties for city: ${city}`);
  return api.get(URLS.FETCHINGMANAGEMENT.hh_all_property_results, {
    params: { city: city }
  });
};

