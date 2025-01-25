import React, { useState } from 'react'
import { Star, User, Calendar, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { handleReply_Action } from '@/features/Booking/BookingActions'
import { Avatar } from '@nextui-org/react'

const ReviewCard = ({ review, isHost=false, isShowReplay=false }) => {
  const [replyText, setReplyText] = useState('')
  const [isReplying, setIsReplying] = useState(false)

  const handleReply = () => {
    console.log('replyingText');
    handleReply_Action(review.id, replyText).then((response) => {

      console.log('replyText', response);
      review.review_replay = replyText
      setReplyText('')
      setIsReplying(false)

    }).catch((error) => {
      console.error(error)
    })

  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between min-w-80">

      <div className='space-y-4 '>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
        {review?.reviewer_pic ? 
  <img src={review.reviewer_pic} className="w-10 h-10 rounded-full" /> : 
  <User className="w-10 h-10 text-gray-400 bg-gray-100 rounded-full p-2" />
}
          <div>
            <h3 className="font-semibold text-lg">{review.user_name}</h3>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date(review.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold text-lg">{review.overall_rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-gray-700">{review.review_text}</p>

      <div className="grid grid-cols-2 gap-4 gap-x-8 text-sm text-gray-600">
        <div>Cleanliness: {review.cleanliness}/5</div>
        <div>Accuracy: {review.accuracy}/5</div>
        <div>Communication: {review.communication}/5</div>
        <div>Location: {review.location}/5</div>
        <div>Check-in: {review.check_in}/5</div>
        <div>Value: {review.value}/5</div>
      </div>
      </div>
      
    <div className='mt-4'>
      {review.review_replay && isShowReplay && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-semibold mb-2">Host Reply:</h4>
          <p className="text-gray-700">{review.review_replay}</p>
        </div>
      )}

      {isHost && !review.review_replay && (
        <div>
          {isReplying ? (
            <div className="space-y-2">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsReplying(false)}>Cancel</Button>
                <Button onClick={handleReply}>Submit Reply</Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsReplying(true)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Reply to Review
            </Button>
          )}
        </div>
      )}
      </div>
    </div>
  )
}

export default ReviewCard

