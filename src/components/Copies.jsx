import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar, User, CreditCard, MapPin, Bed, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useParams } from 'react-router'
import { fetchBookingDetialsByID } from '../../../features/Booking/BookingActions'

const BookingDetailsPage = ({ bookingId }) => {
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [showMonthlyRentOption, setShowMonthlyRentOption] = useState(false)


  const { id } = useParams(); 
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true)
        const response = await fetchBookingDetialsByID(id)
        // if (!response.ok) {
        //   throw new Error('Failed to fetch booking details')
        // }
        // const data = await response.json()
        setBooking(response )
        setNewStatus(response .booking_status)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [bookingId])

  const handleStatusChange = async (e) => {
    e.preventDefault()
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (!response.ok) {
        throw new Error('Failed to update booking status')
      }
      setBooking({ ...booking, booking_status: newStatus })
      setShowMonthlyRentOption(newStatus === 'checked_in')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleJoinMonthlyRent = async () => {
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/bookings/${bookingId}/monthly-rent`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Failed to join monthly rent program')
      }
      // Handle successful join (e.g., show a success message)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>
  if (!booking) return <div className="text-center py-10">No booking found</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-semibold">{booking.hostel_details.name}</h2>
              <p className="text-gray-600">{booking.room_details.name}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking.booking_status === 'confirmed' ? 'bg-green-100 text-green-800' :
              booking.booking_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              booking.booking_status === 'cancelled' ? 'bg-red-100 text-red-800' :
              booking.booking_status === 'checked_in' ? 'bg-blue-100 text-blue-800' :
              booking.booking_status === 'checked_out' ? 'bg-gray-100 text-gray-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {booking.booking_status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <span>Check-in: {format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-gray-500" />
              <span>Booked by: {booking.booked_by}</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
              <span>Amount: ₹{booking.booking_amount}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-500" />
              <span>Booked on: {format(new Date(booking.booking_date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-gray-500" />
              <span>City: {booking.hostel_details.city}</span>
            </div>
            <div className="flex items-center">
              <Bed className="w-5 h-5 mr-2 text-gray-500" />
              <span>Room: {booking.room_details.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Change Booking Status</h3>
          <form onSubmit={handleStatusChange} className="flex items-center space-x-4">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
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
        </div>
      </div>

      {true && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Monthly Rent Option</h3>
            <p className="mb-4">
              The guest has checked in. Would you like to offer them the option to join our monthly rent program?
            </p>
            <button
              onClick={handleJoinMonthlyRent}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Offer Monthly Rent Option
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
    </div>
  )
}

export default BookingDetailsPage