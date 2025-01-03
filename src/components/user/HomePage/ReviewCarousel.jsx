import React, { useRef, useEffect, useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy')
  }

  return (
    <div className="min-w-[calc(50%-16px)] lg:min-w-[calc((100%-96px)/2.5)] bg-white rounded-xl shadow-md p-6 mx-4 flex flex-col gap-4 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{review.user_name}</h3>
          <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{review.overall_rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Cleanliness</span>
          <span className="font-medium">{review.cleanliness}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Location</span>
          <span className="font-medium">{review.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Check-in</span>
          <span className="font-medium">{review.check_in}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Value</span>
          <span className="font-medium">{review.value}</span>
        </div>
      </div>

      {review.review_text && (
        <p className="text-gray-700 line-clamp-3">{review.review_text}</p>
      )}
    </div>
  )
}

const ReviewCarousel = ({ reviews }) => {
  const scrollContainerRef = useRef(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  useEffect(()=>{
    console.log(reviews,"reveiwfldsjfldsjflds")
  })

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.5
    const newScrollPosition = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
    
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    })
  }

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftButton(container.scrollLeft > 0)
    setShowRightButton(
      container.scrollLeft < (container.scrollWidth - container.clientWidth - 10)
    )
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      checkScroll()
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [])

  if (!reviews?.length) {
    return null
  }

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('left')}
          className={`p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-gray-900 transition-opacity ${
            showLeftButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 py-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews?.map((review) => (
          <div key={review.id} className="snap-start">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('right')}
          className={`p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-gray-900 transition-opacity ${
            showRightButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default ReviewCarousel

