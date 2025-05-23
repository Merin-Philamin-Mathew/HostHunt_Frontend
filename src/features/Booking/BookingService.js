import { admin_api, api } from "../../apis/axios"
import URLS from "../../apis/urls"

//  ==================== BOOKING DETAILS ================================
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
  
    return api.put(`${URLS.BOOKING.update_booking_status}/${booking_id}/`, {
      booking_status: update_status,
      })
  }

// ======================== RENT =============================
export const createRentInstance_Service =(rentDetails) =>{
    return api.post(`${URLS.BOOKING.host_rent_instance_creation}`, {
      rentDetails: rentDetails,
    })
  }

export const getUpcomingRent_Servie =(booking_id) =>{
    return api.get(`${URLS.BOOKING.rent_upcoming}${booking_id}/`)
  }
export const getPaid_Overdue_Servie =(booking_id) =>{
    return api.get(`${URLS.BOOKING.rent_paid_overdue_by_booking_id}${booking_id}/`)
  }
export const paymentConfirmation_by_owner =(rent_id) =>{
    return api.put(`${URLS.BOOKING.host_rent_instance_payment_confirmation}${rent_id}/`)
  }

  // ===================== REVIEWS ============================
  // specific views of a particular booking id
  export const createReviewByBookingID_Service =(data) =>{
    return api.post(`${URLS.REVIEWS.reviews_by_booking_id}`, data)
  }
  export const getReviewByBookingID_Service =(data) =>{
    return api.put(`${URLS.REVIEWS.reviews_by_booking_id}${review_id}/`, data)
  }
  export const updateReviewByBookingID_Service =(data,review_id) =>{
    return api.put(`${URLS.REVIEWS.reviews_by_booking_id}${review_id}/`, data)
  }

  // all review public api
  export const getAllReviewsByPublicApi_service = (params) => {
    return api.get(`${URLS.REVIEWS.all_reviews_public_api}${params}`)
  }
  export const hostReplayToReviews_service = (review_id,replyText) => {
    return api.put(`${URLS.REVIEWS.host_replay_to_reviews}${review_id}/`,  {
      review_reply: replyText,
    })
  }
  // ==================== OWNER DASHBOARD ==================================
  export const getDashboardBookingDetails_service =(frequency,user_id) =>{
    return api.put(`${URLS.OWNER_DASHBOARD.booking_graph}${user_id}/`, data)
  }
  export const getDashboardSummary_service =() =>{
    return api.get(`${URLS.OWNER_DASHBOARD.dashboard_summary}`)
  }
  export const getDashboardSummary_admin_service =() =>{
    return admin_api.get(`${URLS.OWNER_DASHBOARD.dashboard_summary}`)
  }
  export const getPaymentRecord_service = (params) => {
    console.log('user payment record',params);
    
    return api.get(`${URLS.OWNER_DASHBOARD.payment_record}`, { params });
  };
  
  export const getPaymentRecord_Adminservice = (params) => {
    console.log('admin payment record',params);
    
    return admin_api.get(`${URLS.OWNER_DASHBOARD.payment_record}`, { params });
  };
  


