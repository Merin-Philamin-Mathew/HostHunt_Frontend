import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Search, X } from 'lucide-react'
import { format } from 'date-fns'
import { MdStarRate } from 'react-icons/md'

const PD_ReviewSection = ({ property_reviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Calculate average overall rating
  const averageRating = property_reviews?.reduce((acc, review) => 
    acc + review.overall_rating, 0) / property_reviews?.length || 0

  // Calculate category averages
  const categories = ['cleanliness', 'accuracy', 'check_in', 'communication', 'location', 'value']
  const categoryAverages = categories.reduce((acc, category) => {
    acc[category] = property_reviews?.reduce((sum, review) => 
      sum + review[category], 0) / property_reviews?.length || 0
    return acc
  }, {})

  const filteredReviews = property_reviews?.filter(review =>
    review.review_text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Rating Bar Component
  const RatingBar = ({ rating }) => (
    <div className="flex items-center gap-2">
      <div className="h-2 bg-gray-200 rounded-full flex-grow">
        <div 
          className="h-full bg-gray-800 rounded-full"
          style={{ width: `${(rating / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-medium w-8">{rating.toFixed(1)}</span>
    </div>
  )

  return (
    <>
      {/* Summary View */}
      {property_reviews?.length > 0 ? (
  <button 
    onClick={() => setIsModalOpen(true)}
    className="flex items-center gap-2 hover:animate-pulse rounded-lg transition-colors"
  >
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <svg
            key={index}
            className={`w-5 h-5 ${
              averageRating >= ratingValue
                ? 'text-amber-400' // Full star
                : averageRating >= ratingValue - 0.5
                ? 'text-amber-400' // Half star
                : 'text-gray-300'   // Empty star
            }`}
            fill={averageRating >= ratingValue - 0.5 ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d={
                averageRating >= ratingValue
                  ? 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' // Full star
                  : 'M12 15.4l3.76 2.27-.99-4.28L18 9.5l-4.38-.38L12 5l-1.62 4.12L6 9.5l3.24 2.89-.99 4.28z' // Half star
              }
            />
          </svg>
        );
      })}
      <span className="font-semibold">{averageRating.toFixed(1)}</span>
    </div>
    <span className="text-gray-600">·</span>
    <span className="text-gray-600 ">
      {property_reviews?.length} reviews
    </span>
  </button>
) : (
        <>
        <div className="flex gap-1 ">
                <div>
                                  {/* <MdStarRate   className={`w-4 h-4 text-amber-500 fill-thetext-themeColor2`} /> */}
                  
                         <svg
                            className='w-5 h-5 text-amber-400'
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      </div>
                      
                      <span className="text-sm text-gray-600">
                      No reviews yet
                      </span>
                      </div>
                      </>
      )}

      {/* Review Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
                  <div className="absolute -left-4 -right-4 -top-2 -bottom-2 border-4 border-gray-900 rounded-full opacity-10" />
                </div>
                {/* <div className="flex flex-col">
                  <span className="font-semibold text-xl">Guest favourite</span>
                  <span className="text-sm text-gray-600">
                    One of our most loved properties
                  </span>
                </div> */}
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Reviews */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search reviews"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Rating Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              {categories?.map(category => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{category.replace('_', ' ')}</span>
                  </div>
                  <RatingBar rating={categoryAverages[category]} />
                </div>
              ))}
            </div>
          </DialogHeader>

          {/* Reviews List */}
          <div className="space-y-6 mt-6">
            {filteredReviews?.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{review.user_name}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(review.created_at), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                    <span className="font-medium">{review.overall_rating.toFixed(1)}</span>
                  </div>
                </div>
                {review.review_text && (
                  <p className="text-gray-700">{review.review_text}</p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PD_ReviewSection
