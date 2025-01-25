import React from 'react'
import { Calendar, MapPin, Bed } from 'lucide-react'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router'

const HUserBookingCard = ({ booking }) => {
  const navigate = useNavigate()
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-xl cursor-pointer hover:animate-in shadow-lg overflow-hidden border border-gray-300  mx-auto h-20  flex items-center"
    onClick={() => navigate(`/account/my-stays/${booking.booking_id}`)}
    >
      <div className="relative w-32 h-full ">
        <img
          src={booking.booking_image}
          alt={booking.hostel_details.name}
          className="absolute inset-0 w-full h-full  object-cover rounded-xl"
        />
      </div>
      
      <div className="flex-1 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{booking.hostel_details.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-3 h-3 mr-1" />
              {booking.hostel_details.location}
            </div>
          </div>

          <div className="flex items-center">
            <Bed className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-gray-700 text-sm">{booking.room_details.name}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <div>
              <p className="text-sm">Check-in: {formatDate(booking.check_in_date)}</p>
              <p className="text-sm text-gray-500">Booked: {formatDate(booking.booking_date)}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-blue-700">₹{booking.booking_amount}</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium 
              ${booking.booking_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                booking.booking_status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                booking.booking_status === 'reserved' ? 'bg-blue-100 text-blue-800' : 
                booking.booking_status === 'checked_in' ? 'bg-fuchsia-200 text-bg-fuchsia-800' : 
                booking.booking_status === 'checked_out' ? 'bg-cyan-100 text-cyan-800' : 
                'bg-gray-100 text-gray-800'}`}>
              {booking.booking_status}
            </span>
          </div>

              {/* <Button variant='ghost' color='danger' size='md'>Canel </Button> */}
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