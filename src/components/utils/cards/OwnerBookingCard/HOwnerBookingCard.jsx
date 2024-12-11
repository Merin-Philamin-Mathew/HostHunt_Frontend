import React from 'react';
import { format } from 'date-fns';
import { Calendar, User, CreditCard, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const HOwnerBookingCard = ({ booking, loading }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      default: 'bg-gray-100 text-gray-800',
      reserved: 'bg-blue-200 text-blue-800',
      checked_in: 'bg-green-100 text-green-800',
      checked_out: 'bg-teal-100 text-teal-800',
      refunded: 'bg-purple-100 text-purple-800',
    };
    return colors[status?.toLowerCase()] || colors.default;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {booking.hostel_details.name}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              booking.booking_status
            )}`}
          >
            {booking.booking_status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{booking.room_details.name}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          {format(new Date(booking.check_in_date), 'MMM dd, yyyy')}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-1" />
            {booking.booked_by}
          </div>
          <div className="flex items-center text-sm font-medium text-gray-900">
            <CreditCard className="w-4 h-4 mr-1" />
            ₹{booking.booking_amount}
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(`/host/bookings/${booking.booking_id}`)}
        className="w-full bg-gray-50 px-4 py-2 text-sm text-blue-600 font-medium hover:bg-gray-100 transition-colors flex items-center justify-between"
      >
        View Details
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

HOwnerBookingCard.defaultProps = {
  booking: {},
  loading: false,
};

export default HOwnerBookingCard;
