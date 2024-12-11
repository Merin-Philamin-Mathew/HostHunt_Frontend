import { api } from "../../apis/axios"
import URLS from "../../apis/urls"


export const getbookingDetailsByIdService =(booking_id) =>{
    return api.get(`${URLS.BOOKING.booking_detials_by_id}/${booking_id}/`)
  }

export const getUserBookingByUserID_Service =() =>{
    return api.get(`${URLS.BOOKING.user_booking_details_by_userId}/`)
  }

export const getHostBooking_Service =() =>{
    return api.get(`${URLS.BOOKING.host_booking_details}/`)
  }

export const updateBookingStatus_Service =(booking_id,update_status) =>{
  
    return api.patch(`${URLS.BOOKING.update_booking_status}/${booking_id}/`, {
      booking_status: update_status,
      })
  }