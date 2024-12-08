import { getbookingDetailsByIdService, getUserBookingByUserID_Service } from "./BookingService";


export const fetchBookingDetialsByID = async(booking_id,) => {
    try {
        const response = await getbookingDetailsByIdService(booking_id)
        console.log('all booking det....',response,response.data);
        return response.data
        
    }
    catch(error){
        console.error(error)
    }
}

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