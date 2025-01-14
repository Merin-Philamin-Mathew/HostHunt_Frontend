import HostReviewDisplay from '@/components/property_owner/reviews/HostReviewDisplay'
import React from 'react'

function POReviews() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-themeColor2li8">Your Property Reviews</h1>
      <HostReviewDisplay />
    </div>
  )
}

export default POReviews

