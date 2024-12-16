import { toast } from "sonner";
import { createRentInstance_Service, getbookingDetailsByIdService, getHostBooking_Service, getUpcomingRent_Servie, getUserBookingByUserID_Service, updateBookingStatus_Service } from "./BookingService";


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