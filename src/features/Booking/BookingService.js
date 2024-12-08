import { api } from "../../apis/axios"
import URLS from "../../apis/urls"


export const getbookingDetailsByIdService =(booking_id) =>{
    return api.get(`${URLS.BOOKING.booking_detials_by_id}/${booking_id}/`)
  }

export const getUserBookingByUserID_Service =() =>{
    return api.get(`${URLS.BOOKING.user_booking_details_by_userId}/`)
  }