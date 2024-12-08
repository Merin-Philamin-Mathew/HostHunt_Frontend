import React, { useEffect, useState } from 'react'
import { fetchUserBookings } from '../../../features/Booking/BookingActions';
import UserBookingCard from '../../utils/cards/UserBookingCards/VUserBookingCard';
import HUserBookingCard from '../../utils/cards/UserBookingCards/HUserBookingCard';

function MyStays() {
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        fetchUserBookings()
            .then((data) => setBookingDetails(data))
            .catch((err) => setError("Failed to fetch booking details."));
      }, []);

  return (
    <div>
      {/* <div className="grid md:grid-cols-2 grid-cols-1  lg:grid-cols-3 gap-8">
          {bookingDetails?.map((booking, index) => (
            <UserBookingCard key={index} booking={booking} />
          ))}
        </div> */}
         {bookingDetails?.map((booking, index) => (
        <div className='py-4'> 
             <HUserBookingCard key={index} booking={booking}/>
        </div>
            ))}
    </div>
  )
}

export default MyStays
