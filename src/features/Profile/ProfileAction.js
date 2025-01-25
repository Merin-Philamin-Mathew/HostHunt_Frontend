import { toast } from "sonner";
import { createIdentityValidation_service } from "./ProfileServices";
import { api } from "@/apis/axios";
import URLS from "@/apis/urls";

export const createIdentityVerification_action = async (values,setSubmitting,setIsLoading,onClose) => {
    const formData = new FormData()
    
    Object.keys(values).forEach(key => {
      if (values[key]) {
        if (key === 'identity_card_front_img' || key === 'identity_card_back_img') {
          if (values[key] instanceof File) {
            formData.append(key, values[key])
          } else if (typeof values[key] === 'string') {
            formData.append(key, values[key])
          }
        } else {
          formData.append(key, values[key])
        }
      }
    })

    
    try {
        setIsLoading(true)
        const response = await  createIdentityValidation_service(formData)
        toast.success('Verification submitted successfully')
        onClose()
        console.log('response',response)
        return response.data
      } catch (error) {
        console.error('Submission failed', error)
        toast.error('Verification submission failed')
      } finally {
        setSubmitting(false)
        setIsLoading(false)
      }
  };


  export const uploadProfilePic = async (file) => {
    console.log('uploading')
    const formData = new FormData();
    formData.append('pro_pic', file);
    try {
      const response = await api.post(URLS.PROFILE.profile_pic_upload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(response.data.message);
      console.log('response from act8io',response.data)

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessages = Object.values(error.response.data)
            .flat() 
            .join(' ');
    
        toast.error(errorMessages);
    }
      throw error.response.data;
    }
  };
  export const editUplodedProfilePic = async (file) => {
    console.log('editing uploading')
    const formData = new FormData();
    formData.append('pro_pic', file);
    try {
      const response = await api.put(URLS.PROFILE.profile_pic_upload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(response.data.message);
      console.log('response from act8io',response.data)
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessages = Object.values(error.response.data)
            .flat() 
            .join(' ');
    
        toast.error(errorMessages);
    }
      throw error.response.data;
    }
  };