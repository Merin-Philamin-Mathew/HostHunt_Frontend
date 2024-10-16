import { admin_api } from "../../apis/axios";
import URLS from "../../apis/urls";

export const loginAdminService = (data)=>{
    return admin_api.post(URLS.AUTHENTICATION.login,data)
}

export const adminGetPropertiesService = ({propStatus='',page=''}) =>{
    return admin_api.get(URLS.ADMINMANAGEMENT.all_properties,
        {params: { propStatus, page}}
    )
}
