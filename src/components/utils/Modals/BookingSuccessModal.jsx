import React from 'react'
import { X, Check, Calendar, MapPin } from 'lucide-react'

const BookingSuccessModal = ({ isOpen, onClose, bookingDetails }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600">
              Your booking has been successfully confirmed. We've sent a confirmation email to your registered email address.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Booking Details</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{bookingDetails.propertyName}</p>
                  <p className="text-sm text-gray-600">{bookingDetails.roomType}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                <p className="text-gray-600">
                  Check-in: <span className="font-medium text-gray-900">{bookingDetails.checkInDate}</span>
                </p>
              </div>
              <p className="text-gray-600">
                Guests: <span className="font-medium text-gray-900">{bookingDetails.guests}</span>
              </p>
              <p className="text-gray-600">
                Total Amount: <span className="font-medium text-gray-900">₹{bookingDetails.totalAmount}</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex-1"
            >
              View Booking Details
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

BookingSuccessModal.defaultProps = {
  isOpen: true,
  onClose: () => {},
  bookingDetails: {
    propertyName: 'Zostel Kochi (Ernakulam)',
    roomType: '6 Standard Bed Mixed Dorm',
    checkInDate: 'March 18, 2024',
    guests: 2,
    totalAmount: '2,705'
  }
}

export default BookingSuccessModal