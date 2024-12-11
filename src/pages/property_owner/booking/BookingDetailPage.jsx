import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar, User, CreditCard, MapPin, Bed, Clock, Mail, MessageCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { fetchBookingDetialsByID, updateBookingStatus } from '../../../features/Booking/BookingActions'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import StatusDropdown from '../../../components/property_owner/bookings/StatusDropDown'

const BookingDetailsPage = () => {
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [showMonthlyRentOption, setShowMonthlyRentOption] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true)
        const response = await fetchBookingDetialsByID(id)
        setBooking(response)
        setNewStatus(response.booking_status)
        setShowMonthlyRentOption(response.booking_status === 'checked_in')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [id])

  const handleStatusChange = async (booking_id) => {
    try {
      await updateBookingStatus(booking_id, newStatus)
      setBooking({ ...booking, booking_status: newStatus })
      setShowMonthlyRentOption(newStatus === 'checked_in')
    } catch (err) {
      setError(err.message)
    }
  }



  if (loading) return <div className="flex items-center justify-center min-h-screen "><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>
  if (error) return <div className="text-center py-10 text-red-600 bg-gray-100">{error}</div>
  if (!booking) return <div className="text-center py-10 text-gray-700 bg-gray-100">No booking found</div>

  return (
    <div className="min-h-screen  text-gray-800 py-4">
      <div className="max-w-5xl mx-auto">
      <Breadcrumbs>
      <BreadcrumbItem href="/host/bookings">Bookings</BreadcrumbItem>
      <BreadcrumbItem href="">Booking Details</BreadcrumbItem>
    </Breadcrumbs>
        <div className="flex justify-between items-center my-8">
          <h1 className="text-3xl font-bold">Booking Details</h1>
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Message Guest
          </button> */}
        </div>

        {/* Guest Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{booking.user_details.name}</h2>
                <div className="flex items-center text-gray-600 mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {booking.user_details.email}
                </div>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
             booking.booking_status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
             booking.booking_status === 'confirmed' ? 'bg-green-100 text-green-800' :
             booking.booking_status === 'checked_in' ? 'bg-blue-100 text-blue-800' :
             booking.booking_status === 'checked_out' ? 'bg-gray-300 text-gray-800' :
             booking.booking_status === 'cancelled' ? 'bg-red-100 text-red-800' :
             
              'bg-gray-100 text-gray-800'
            }`}>
              {booking.booking_status.toUpperCase()}
            </span>
          </div>
        </div>

        
        {/* Monthly Rent Option Card */}
        {showMonthlyRentOption && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Monthly Rent Option</h3>
            <p className="mb-4 text-gray-600">
              The guest has checked in. Would you like to offer them the option to join our monthly rent program?
            </p>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
              onClick={() => navigate(`/host/bookings/${id}/monthly-rent`)}
              >
              Offer Monthly Rent Option
            </button>
          </div>
        )}

        {/* Property Details Card */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img 
              src={booking.booking_image} 
              alt={booking.hostel_details.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{booking.hostel_details.name}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                {booking.hostel_details.location}
              </div>
              <div className="flex items-center text-gray-600">
                <Bed className="w-4 h-4 mr-2" />
                {booking.room_details.name}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Booking Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Check-in Date
                </div>
                <span>{format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Booking Date
                </div>
                <span>{format(new Date(booking.booking_date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Amount Paid
                </div>
                <span className="text-xl font-semibold">₹{booking.booking_amount}</span>
              </div>
              <div className='pt-8'>
              <h3 className="text-xl font-semibold mb-4">Update Booking Status</h3>
            
                <div className='flex gap-4'>
                    <StatusDropdown currentStatus={newStatus} onStatusChange={setNewStatus} />
                  <button
                    className="bg-themeColor text-white px-4 py-2 rounded-xl hover:bg-opacity-80 transition-colors"
                    onClick={()=>handleStatusChange(booking.booking_id)}
                    >
                    Update Status
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Status Update Card */}
        {/* <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Update Booking Status</h3>
          <form onSubmit={handleStatusChange} className="flex items-center space-x-4">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="reserved">Reserved</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Update Status
            </button>
          </form>
        </div> */}


        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingDetailsPage