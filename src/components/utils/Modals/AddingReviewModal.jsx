import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, Home, Sparkles, Clock, MessageCircle, MapPin, DollarSign } from 'lucide-react'
import { MdStarRate } from 'react-icons/md'
import { toast } from 'sonner'

const AddingReviewModal = ({review, isOpen, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState({
    cleanliness: 0,
    accuracy: 0,
    check_in: 0,
    communication: 0,
    location: 0,
    value: 0,
  })
  const [overallRating, setOverallRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const isFormValid = Object.values(ratings).every((rating) => rating > 0);

  useEffect(() => {
    if (review) {
      setRatings({
        cleanliness: review.cleanliness || 0,
        accuracy: review.accuracy || 0,
        check_in: review.check_in || 0,
        communication: review.communication || 0,
        location: review.location || 0,
        value: review.value || 0,
      });
      setReviewText(review.review_text || '');
      setOverallRating(review.overall_rating || 0);
    }
  }, [review]);

  useEffect(() => {
    const total = Object.values(ratings).reduce((sum, rating) => sum + rating, 0);
    setOverallRating(Number((total / Object.keys(ratings).length).toFixed(2))); // Convert to number
  }, [ratings]);
  

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }))
  }

  const handleSubmit = () => {
    const incompleteRatings = Object.values(ratings).some((rating) => rating === 0);
    
    if (incompleteRatings) {
      toast.error("Please provide a rating for all categories before submitting.");
      return;
    }
    
    onSubmit({ ...ratings, overall_rating: overallRating, review_text: reviewText });
    onClose();
  };
  
  const RatingCategory = ({ category, icon: Icon, label }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5 text-themeColor2li8" />
        <span className="text-sm font-medium text-themeColor2li8">{label}</span>
      </div>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <MdStarRate
            key={star}
            className={`w-7 h-7 cursor-pointer transition-colors duration-200 ${
              star <= ratings[category] ? 'text-themeColor fill-themeColor' : 'text-gray-300'
            }`}
            onClick={() => handleRatingChange(category, star)}
          />
        ))}
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Rate Your Stay</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="bg-gradient-to-r from-gray-100 to-slate-100 p-4 rounded-lg">
            <RatingCategory category="cleanliness" icon={Sparkles} label="Cleanliness" />
            <RatingCategory category="accuracy" icon={Home} label="Accuracy" />
            <RatingCategory category="check_in" icon={Clock} label="Check-in" />
            <RatingCategory category="communication" icon={MessageCircle} label="Communication" />
            <RatingCategory category="location" icon={MapPin} label="Location" />
            <RatingCategory category="value" icon={DollarSign} label="Value" />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Overall Rating</h3>
            <div className="flex justify-center items-center space-x-2">
              <span className="text-3xl font-bold text-themeColor2">{overallRating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                 <MdStarRate 

                    key={star}
                    className={`w-7 h-7 ${
                      star <= Math.round(overallRating)
                        ? 'text-themeColor fill-themeColor'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
              Share your experience
            </label>
            <Textarea
              id="review-text"
              rows={4}
              placeholder="Tell us about your stay..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-themeColor2li8 focus:border-themeColor2li8"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            // disabled={!isFormValid} 
            className={`bg-themeColor2 hover:bg-themeColor2li8 ${!isFormValid && 'opacity-70 cursor-not-allowed'}`}>
            Submit Review
          </Button>        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddingReviewModal

