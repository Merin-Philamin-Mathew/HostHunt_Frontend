import { api } from "@/apis/axios"
import URLS from "@/apis/urls"

export const createUserProfile_service = (data) =>{
    return api.post(URLS.PROFILE.user_profile, data)
  }
  export const createIdentityValidation_service = (data) => {
    return api.post(URLS.PROFILE.identity_verification, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }