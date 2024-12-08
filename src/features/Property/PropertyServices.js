import { api } from "../../apis/axios";
import URLS from "../../apis/urls";



export const getAllAmenitiesService = () =>{
  return api.get(URLS.FETCHINGMANAGEMENT.hh_all_amenities,)
}



//===================== NEW_LISTING =============================
export const getAllPropertiesOfHost =(searchQuery = '') =>{
    return api.get(URLS.HOSTMANAGEMENT['host_properties'],{
      params: {search: searchQuery || undefined }
  });
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
export const createRoomsService = (formData) => {
  return api.post(URLS.ONBOARDING['rooms'], formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  })
};//same api for get and create

export const getRoomDetailsService = (data) =>{
    return api.get(URLS.ONBOARDING['rooms'],data) //getting by property_id which can be sent with the data
}
export const updateRoomDetailsService = (id) =>{
  return api.put(`${URLS.ONBOARDING['rooms']}/${id}/`)
}
export const deleteRoomDetailsService = (id) =>{
  return api.delete(`${URLS.ONBOARDING['rooms']}${id}/`)
}

export const getAllRoomsByProperty = (property_id) =>{
    return api.get(`${URLS.HOSTMANAGEMENT['room_by_property']}/${property_id}/`) //getting by property_id which can be sent with the data
}
// property images
export const createPropertyImagesService = (property_id,formData) => {
  return api.post(`${URLS.ONBOARDING['property_images']}${property_id}/`,formData, {
    headers: {
      'Content-Type':'multipart/form-data'
    }
  })
}
export const getPropertyImagesService = (property_id) => {
  return api.get(`${URLS.ONBOARDING['property_images']}${property_id}/`)
}
export const deletePropertyImageService = (image_id) => {
  return api.delete(`${URLS.ONBOARDING['property_images']}${image_id}/`)
}

// ================FETCHING DATAS===================
export const getActiveRoomFacilities = () =>{
  return api.get(URLS.FETCHINGMANAGEMENT['hh_active_room_facilities'])
}
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
export const getDetailedDisplay_property = (property_id) => {
  console.log(`Requesting properties for city: ${property_id}`);
  return api.get(`${URLS.FETCHINGMANAGEMENT.hh_published_property_display}${property_id}/`);
};

