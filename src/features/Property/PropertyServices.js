import { api } from "../../apis/axios";
import URLS from "../../apis/urls";


// export const ownerUpdatePropertyDetails = ({storedPropertyId,formData}) =>{
//     return api.put(`${URLS.NEWLISTING['property_details']}/${storedPropertyId}/`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
// }
// export const ownerAddPropertyDetails = ({formData}) =>{
//     return api.post(URLS.NEWLISTING['property_details'], formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
// }

export const getAllPropertiesOfHost =() =>{
    return api.get(URLS.HOSTMANAGEMENT['host_properties'])
}

export const getAllDocumentsofProperty =(property_id) =>{
  console.log('kkkkkllll');
  
    return api.get(`${URLS.NEWLISTING['property_documents']}/${property_id}/`)
}
