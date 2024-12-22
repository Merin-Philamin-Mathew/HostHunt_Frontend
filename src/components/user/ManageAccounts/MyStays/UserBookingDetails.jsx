import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar, User, CreditCard, MapPin, Bed, Clock, Mail, MessageCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { createReviewsByBookingId, fetchBookingDetialsByID, updateBookingStatus, updateReviewByBookingId } from '@/features/Booking/BookingActions'
import SlenderRing from '@/components/utils/loaders/SlenderRing'
import { FaBuilding } from 'react-icons/fa'
import AddingReviewModal from '@/components/utils/Modals/AddingReviewModal'
import ReviewDisplay from './ReviewDisplay'

const UserBookingDetails = () => {
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
//   const [newStatus, setNewStatus] = useState('')
  const [ReviewModal, setReviewModal] = useState(false)
  const navigate = useNavigate()
  

  const { id } = useParams()

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true)
        const response = await fetchBookingDetialsByID(id)
        setBooking(response)
        // setNewStatus(response.booking_status)
        // setReviewModal(response.booking_status === 'checked_in')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [id])



  const handleRentPaymentNavigation = () => {
    navigate(`/account/my-stays/${id}/monthly-rent`, {
      state: {
        monthly_rent:booking.room_details.monthly_rent,
        is_rent:booking.is_rent
      },
    });
  };
  

  const handleAddReview = () => {
    setReviewModal(true); // Open the modal for adding a review
  };

  const SubmitReview = async (data) => {
    const reviewData = {
      ...data,
      booking: id, // Include the booking ID in the payload
    };
  
    try {
      setReviewModal(false);
  
      if (booking?.reviews) {
        const reviewId = booking.reviews.review_id;
        const updatedReview = await updateReviewByBookingId(reviewData, reviewId);
        
        setBooking((prevBooking) => ({
          ...prevBooking,
          reviews: { ...prevBooking.reviews, ...reviewData },
        }));
        
        console.log("Review updated successfully", updatedReview);
      } else {
        const createdReview = await createReviewsByBookingId(reviewData);
  
        setBooking((prevBooking) => ({
          ...prevBooking,
          reviews: reviewData, // Assuming the API returns the created review object
        }));
        
        console.log("Review submitted successfully", createdReview);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  
  
  

  const handleEditReview = () => {
    setReviewModal(true)
  };




  if (loading) return <SlenderRing/>
  if (error) return <div className="text-center py-10 text-red-600 bg-gray-100">{error}</div>
  if (!booking) return <div className="text-center py-10 text-gray-700 bg-gray-100">No booking found</div>

  return (
    <div className="min-h-screen  text-gray-800 ">
   



{/* Property Details Card */}
<div className="grid md:grid-cols-2 gap-6 mb-6">
  {/* First Card (1/3 width) */}
  <div className="bg-white rounded-xl shadow-md overflow-hidden relative z-0 ">
    {/* Booking Status */}
    <span
      className={`absolute top-4 right-4 px-4 py-2 rounded-lg text-sm font-medium ${
        booking.booking_status === "reserved"
          ? "bg-yellow-100 text-yellow-800"
          : booking.booking_status === "confirmed"
          ? "bg-green-100 text-green-800"
          : booking.booking_status === "checked_in"
          ? "bg-cyan-100 text-cyan-800"
          : booking.booking_status === "checked_out"
          ? "bg-gray-300 text-gray-800"
          : booking.booking_status === "cancelled"
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {booking.booking_status.toUpperCase()}
    </span>
    {/* Booking Image */}
    <img 
      src={booking.booking_image} 
      alt={booking.hostel_details.name}
      className="w-full h-48 object-cover"
    />
    {/* Property Details */}
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

  {/* Second Card (2/3 width) */}
  <div className="bg-white rounded-xl shadow-md p-6">
  
  {/* Host Details */}
  <div className="flex justify-between items-start">
    {/* Host Details Section */}
    <div className="flex items-center gap-4">
      {/* User Avatar */}
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-gray-500" />
      </div>
      <div>
        {/* Host Name and Badge */}
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {booking.host_details?.name}
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
            <FaBuilding className="w-3 h-3" />
            Host
          </span>
        </h2>
        {/* Host Email */}
        <div className="flex items-center text-gray-600 mt-1">
          <Mail className="w-4 h-4 mr-2" />
          {booking.host_details?.email}
        </div>
      </div>
    </div>
  </div>
  {/* Divider */}

  <div className="border-t border-gray-300 my-6"></div>
  
  <h3 className="text-xl font-semibold mb-4">Booking Information</h3>
<div className="space-y-4">
    {/* Check-in Date */}
    <div className="flex items-center justify-between">
      <div className="flex items-center text-gray-600">
        <Calendar className="w-4 h-4 mr-2" />
        Check-in Date
      </div>
      <span>{format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</span>
    </div>
    {/* Booking Date */}
    <div className="flex items-center justify-between">
      <div className="flex items-center text-gray-600">
        <Clock className="w-4 h-4 mr-2" />
        Booking Date
      </div>
      <span>{format(new Date(booking.booking_date), 'MMM dd, yyyy')}</span>
    </div>
    {/* Amount Paid */}
    <div className="flex items-center justify-between">
      <div className="flex items-center text-gray-600">
        <CreditCard className="w-4 h-4 mr-2" />
        Amount Paid
      </div>
      <span className="text-xl font-semibold">₹{booking.booking_amount}</span>
    </div>
  </div>


</div>

</div>

{booking.is_rent && (
        <div className='bg-white bg-opacity-20 rounded-xl shadow-large text-center p-6 my-6 font-semibold'>
            <p className="mb-4 text-gray-600 ">
                This booking is a part of the monthly rent program. Manage the rent details below.
            </p>
            <button
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
            onClick={handleRentPaymentNavigation}
            >      
            Manage Rent
            </button>
        </div>
    )
}

<AddingReviewModal
review = {booking?.reviews}
 isOpen={ReviewModal}
 onClose={() => setReviewModal(false)}
 onSubmit={SubmitReview}
/>


{/* Review Option Card */}
{(booking.booking_status === 'checked_in' || booking.booking_status === 'checked_out') && (
   <>
   {!booking.reviews ? (
  <div className="bg-white bg-opacity-20 rounded-xl shadow-large  p-6 mt-6 text-gray-600 font-semibold">
      <div className="text-center">
        <p className="text-gray-600 mb-4">You haven't reviewed this booking yet.</p>
        <button
          onClick={handleAddReview}
          className="bg-themeColor2 text-white px-4 py-2 rounded-md hover:bg-themeColor2li8 transition"
        >
          Add Review
        </button>
      </div>
      </div>
    ) : (
        <ReviewDisplay review={booking.reviews} onEditReview={handleEditReview} />

    )}
  </>
)}


        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
    </div>
  )
}

export default UserBookingDetails