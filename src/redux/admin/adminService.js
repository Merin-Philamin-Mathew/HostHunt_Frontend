import { admin_api } from "../../apis/axios";
import URLS from "../../apis/urls";
import Cookies from 'js-cookie';


export const loginAdminService = (data)=>{
    return admin_api.post(URLS.AUTHENTICATION.login,data)
}

//====================================== ADMIN PROPERTY MANAGEMENT==================================
export const adminGetPropertiesService = ({propStatus='',page=''}) =>{
    return admin_api.get(URLS.ADMINMANAGEMENT.all_properties,
        {params: { propStatus, page}}
    )
}
export const adminGetPropertiesBasicDetailsService = (property_id) =>{
    return admin_api.get(`${URLS.ADMINMANAGEMENT.basic_details}/${property_id}/`)
}
export const adminApproveOrRejectProperties = (property_id, status) => {
    const csrfToken = Cookies.get('csrftoken');
    console.log(csrfToken);
    
    return admin_api.patch(
        `${URLS.ADMINMANAGEMENT.approve_reject_property}/${property_id}/${status}/`,
    );
};

//====================================== ADMIN USER MANAGEMENT==================================
export const adminGetUserService = ({ page = 1 }) =>{
    return admin_api.get(URLS.ADMINMANAGEMENT.all_users,
        {params: {page}}
    )
}
export const adminGetOwnerService = ({ page = 1 }) =>{
    return admin_api.get(URLS.ADMINMANAGEMENT.all_owners,
        {params: {page}}
    )
}

//====================================== ADMIN PROPERTY CONFIGURATION MANAGEMENT==================================
export const adminGetAmenities = () =>{
    return admin_api.get(URLS.ADMINMANAGEMENT.pc_amenities)
}
export const adminCreateAmenities = (data) =>{
    console.log('daata',data);
    return admin_api.post(URLS.ADMINMANAGEMENT.pc_amenities,data)
}
export const adminListAllAmenities = () =>{
    return admin_api.get(URLS.ADMINMANAGEMENT.pc_amenities,)
}