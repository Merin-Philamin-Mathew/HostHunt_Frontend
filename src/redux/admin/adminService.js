import { admin_api } from "../../apis/axios";
import URLS from "../../apis/urls";

export const loginAdminService = (data)=>{
    return axios.post(URLS.AUTHENTICATION.login,data)
}

