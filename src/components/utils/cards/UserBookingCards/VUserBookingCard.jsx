import React from 'react'
import { Calendar, MapPin, Bed } from 'lucide-react'

const VUserBookingCard = ({ booking }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md mx-auto">
      <div className="relative h-40 w-full">
        <img
          src={booking.booking_image}
          alt={booking.hostel_details.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-semibold">{booking.hostel_details.name}</h3>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {booking.hostel_details.location}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Bed className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-700 text-sm">{booking.room_details.name}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium 
            ${booking.booking_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              booking.booking_status === 'confirmed' ? 'bg-green-100 text-green-800' : 
              'bg-gray-100 text-gray-800'}`}>
            {booking.booking_status}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <div>
              <p className="text-sm">Check-in: {formatDate(booking.check_in_date)}</p>
              <p className="text-xs text-gray-500">Booked on: {formatDate(booking.booking_date)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-blue-600">₹{booking.booking_amount}</p>
            <p className="text-xs text-gray-500">Total Amount</p>
          </div>
        </div>
      </div>
    </div>
  )
}

VUserBookingCard.defaultProps = {
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

export default VUserBookingCard