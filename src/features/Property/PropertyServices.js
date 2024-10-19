import { api } from "../../apis/axios";
import URLS from "../../apis/urls";


export const ownerUpdatePropertyDetails = ({storedPropertyId,formData}) =>{
    return api.put(`${URLS.NEWLISTING['property_details']}/${storedPropertyId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
}
export const ownerAddPropertyDetails = ({formData}) =>{
    return api.post(URLS.NEWLISTING['property_details'], formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
}
