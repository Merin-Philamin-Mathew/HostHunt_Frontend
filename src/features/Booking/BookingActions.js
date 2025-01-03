import { toast } from "sonner";
import { createRentInstance_Service, createReviewByBookingID_Service, getAllReviewsByPublicApi_service, getbookingDetailsByIdService, getDashboardSummary_service, getHostBooking_Service, getPaid_Overdue_Servie, getUpcomingRent_Servie, getUserBookingByUserID_Service, updateBookingStatus_Service, updateReviewByBookingID_Service } from "./BookingService";


export const fetchBookingDetialsByID = async(booking_id, navigate) => {
    try {
        const response = await getbookingDetailsByIdService(booking_id)
        console.log('all booking det....',response,response.data);
        return response.data
    }
    catch(error){
        console.error(error)
    }
}

export const createRentInstance = async(rentDetails) => {
    try {        
        const response = await createRentInstance_Service(rentDetails)
        toast.success('instance created  successfully!')
        // return response.data.status
    }
    catch(error){
        console.error(error)
    }
}

// =============================== RENT MANAGEMENT ====================================
export const fetchUpcomingRent = async (booking_id) => {
    try {
        const response = await getUpcomingRent_Servie(booking_id);
        if (response && response.data && response.data.upcoming_rent) {
            return response.data.upcoming_rent;
        }
        console.warn("No upcoming rent found in response.");
        return null;
    } catch (error) {
        console.error("Error fetching upcoming rent:", error);
        return null;
    }
};
export const fetchPaid_OverdueRent = async (booking_id) => {
    try {
        const response = await getPaid_Overdue_Servie(booking_id);
        if (response && response.data ) {
            
            return response.data;
        }
        console.warn("No upcoming rent found in response.");
        return null;
    } catch (error) {
        console.error("Error fetching upcoming rent:", error);
        return null;
    }
};


// =================================USER BOOKING MANAGEMENT=======================================
export const fetchUserBookings = async() => {
    try {
        const response = await getUserBookingByUserID_Service()
        console.log('all booking det....',response,response.data);
        return response.data
        
    }
    catch(error){
        console.error(error)
    }
}

//  REVIEWS ===========================
export const createReviewsByBookingId = async(data) => {
    try{
        const response = await createReviewByBookingID_Service(data)
        console.log('review created', response)
    }
    catch(error){
        console.error(error)
    }
}
export const updateReviewByBookingId = async(data,review_id) => {
    try{
        const response = await updateReviewByBookingID_Service(data,review_id)
        console.log('review created', response)
    }
    catch(error){
        console.error(error)
    }
}

// all reviews public
// All reviews for the homepage carousel with page_size = 3
export const getAllReviewsForHomeCarosal = async () => {
    try {
      // Fetch reviews with a page size of 3
      const response = await getAllReviewsByPublicApi_service('?page_size=3')
      
      if (response.status === 200) {
        // Return the reviews data if the response is successful
        return response.data;
      } else {
        // Handle errors gracefully
        console.error("Error fetching reviews:", response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching reviews:", error);
      throw error;
    }
  };
  
// =================================HOST BOOKING MANAGEMENT=======================================
export const fetchHostBookings = async() => {
    try {
        const response = await getHostBooking_Service()
        console.log('all booking det of host ....',response,response.data);
        return response.data
        
    }
    catch(error){
        console.error(error)
    }
}

export const updateBookingStatus = async(booking_id, newStatus,booking) => {
    try {        
        const response = await updateBookingStatus_Service(booking_id, newStatus)
        toast.success('Status updated successfully!')
        return response.data.status
    }
    catch(error){
        console.error(error)
    }
}


// ==================================================
export const fetchDashboardSummary = async() => {
    try {        
        const response = await getDashboardSummary_service()
        console.log('fetchDashboardSummary',response)
        return response.data
    }
    catch(error){
        console.error(error)
    }
}