import React from 'react'
import { Star, Edit, MapPin, Home, Clock, MessageCircle, Sparkles, DollarSign, Reply } from 'lucide-react'
import { MdStarRate } from 'react-icons/md'

const ReviewDisplay = ({ review, onEditReview }) => {
  const ratingCategories = [
    { name: 'cleanliness', icon: Sparkles, label: 'Cleanliness' },
    { name: 'accuracy', icon: Home, label: 'Accuracy' },
    { name: 'check_in', icon: Clock, label: 'Check-in' },
    { name: 'communication', icon: MessageCircle, label: 'Communication' },
    { name: 'location', icon: MapPin, label: 'Location' },
    { name: 'value', icon: DollarSign, label: 'Value' },
  ]

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Review</h2>
          <p className="text-sm text-gray-500">Posted on {formatDate(review.created_at)}</p>
        </div>
        <button
          onClick={onEditReview}
          className="flex items-center gap-2 bg-slate-100 text-themeColor2 px-4 py-2 rounded-xl hover:bg-blue-100 transition duration-300"
        >
          <Edit className="w-4 h-4" />
          Edit Review
        </button>
      </div>

      {review.review_text && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 italic">"{review.review_text}"</p>
        </div>
      )}

      {/* Host Reply Section */}
      {review.review_replay && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Reply className="w-4 h-4 text-themeColor2" />
            <span className="text-sm font-semibold text-themeColor2">Host Reply</span>
          </div>
          <p className="text-gray-700">{review.review_replay}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {ratingCategories.map(({ name, icon: Icon, label }) => (
          <div key={name} className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">{label}</span>
            <div className="flex ml-auto">
              {[1, 2, 3, 4, 5].map((star) => (
                <MdStarRate
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review[name]
                      ? 'text-themeColor2 fill-thetext-themeColor2'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">Overall Rating</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-themeColor">{review.overall_rating.toFixed(1)}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <MdStarRate
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(review.overall_rating)
                      ? 'text-themeColor2 fill-thetext-themeColor2'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewDisplay