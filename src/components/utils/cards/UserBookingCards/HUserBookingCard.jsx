import React from 'react'
import { Calendar, MapPin, Bed, AlertCircle } from 'lucide-react'

const HUserBookingCard = ({ booking }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500',
      reserved: 'bg-blue-500',
      checked_in: 'bg-green-500',
      checked_out: 'bg-teal-500',
      cancelled: 'bg-red-500',
      refunded: 'bg-purple-500',
      default: 'bg-gray-500',
    };
    return colors[status?.toLowerCase()] || colors.default;
  };
  

  return (
    <div>
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl max-h-[400px]">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image Section */}
        <div className="relative sm:w-1/3 w-full h-52">
          <img
            src={booking.booking_image}
            alt={booking.hostel_details.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 sm:bg-gradient-to-r" />
          <div className="absolute bottom-4 left-4 right-4 sm:top-1/2 sm:-translate-y-1/2">
            <h3 className="text-white text-xl font-bold truncate">{booking.hostel_details.name}</h3>
            <p className="text-white/80 text-sm mt-1 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {booking.hostel_details.location || 'Location not specified'}
            </p>
          </div>
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(
              booking.booking_status
            )}`}
          >
            {booking.booking_status}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 sm:w-2/3 flex flex-col justify-between h-full">
          <div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Bed className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{booking.room_details.name}</span>
              </div>

              {booking.booking_status === 'confirmed' && (
                <div className="flex items-center text-yellow-600 bg-yellow-50 p-2 rounded-md">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">Non-refundable booking</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Check-in: {formatDate(booking.check_in_date)}</p>
                  <p className="text-xs">Booked on: {formatDate(booking.booking_date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">₹{booking.booking_amount}</p>
                <p className="text-sm text-gray-500">Total Amount</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end md:flex-row gap-3">
              {/* <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex-1">
            View trip details
          </button>  */}
            {booking.booking_status !== 'cancelled' && (
              <button className="w-full sm:w-auto px-6 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

HUserBookingCard.defaultProps = {
  booking: {
    id: 1,
    check_in_date: '2025-01-01',
    booking_amount: '1233',
    booking_status: 'pending',
    booking_date: '2024-12-05',
    booking_image: 'https://via.placeholder.com/150',
    hostel_details: {
      name: 'Ethan Homes',
      location: 'Ernakulam'
    },
    room_details: {
      name: 'Shared Female Dormitory (12 Single Coat Bed)'
    }
  }
}

export default HUserBookingCard