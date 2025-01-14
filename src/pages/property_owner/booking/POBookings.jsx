import React, { useEffect, useState } from 'react';
import { fetchHostBookings } from '../../../features/Booking/BookingActions';
import HOwnerBookingCard from '../../../components/utils/cards/OwnerBookingCard/HOwnerBookingCard';

function POBookings() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHostBookings()
      .then((data) => {
        setBookingDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch booking details.", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto">

    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
      {loading
        ? Array(9)
            .fill()
            .map((_, index) => <HOwnerBookingCard key={index} loading />)
        : bookingDetails?.map((booking, index) => (
            <HOwnerBookingCard key={index} booking={booking} />
          ))}
    </div>
    </div>
  );
}

export default POBookings;
