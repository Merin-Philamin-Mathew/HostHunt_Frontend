import React, { useEffect, useState } from 'react'
import { fetchUserBookings } from '../../../../features/Booking/BookingActions';
import HUserBookingCard from '../../../utils/cards/UserBookingCards/HUserBookingCard';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import VUserBookingCard from '../../../utils/cards/UserBookingCards/VUserBookingCard';

function MyStays() {
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        fetchUserBookings()
            .then((data) => setBookingDetails(data))
            .catch((err) => setError("Failed to fetch booking details."));
      }, []);

  return (
    <div>
       <div className='py-4'>
       <Breadcrumbs>
            <BreadcrumbItem href="/account" className=''>Account</BreadcrumbItem>
            <BreadcrumbItem href="/account/my-stays">My Stays</BreadcrumbItem>
        </Breadcrumbs> 
          </div>
        
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
            {bookingDetails?.map((booking, index) => (
              <VUserBookingCard key={index} booking={booking} />
            ))}
          </div> */}
          <h1 className="text-3xl my-8 font-bold">My Stays</h1>
     
        {bookingDetails?.map((booking, index) => (
        <div className='py-3'> 
             <HUserBookingCard key={index} booking={booking}/>
        </div>
            ))}
     
    
    </div>
  )
}

export default MyStays
