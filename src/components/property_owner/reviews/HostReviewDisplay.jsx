import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllReviewsForHost } from '@/features/Booking/BookingActions'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ReviewCard from '@/components/user/ReviewCard'

function HostReviewDisplay() {
  const [reviews, setReviews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const userId = useSelector((state) => state?.user?.user?.data?.id)

  useEffect(() => {
    fetchReviews(currentPage)
  }, [currentPage])

  const fetchReviews = async (page) => {
    try {
      setLoading(true)
      console.log(userId)

      const data = await getAllReviewsForHost(`?page=${page}&page_size=${9}&host_id=${parseInt(userId)}`)
      setReviews(data.results)
      setTotalPages(Math.ceil(data.count / 9))
    } catch (err) {
      setError('Failed to fetch reviews')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }



  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
        
          <ReviewCard
            key={review.id}
            review={review}
            isHost={userId === review.host}
            isShowReplay={true}
          />
        ))}
      </div>
      
      <div className="flex justify-center items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default HostReviewDisplay

