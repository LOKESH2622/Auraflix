"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp, ThumbsDown, AlertTriangle, Shield } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Review {
  id: number
  user: string
  avatar: string
  rating: number
  content: string
  date: string
  likes: number
  dislikes: number
  verified: boolean
  flagged?: boolean
  flagReason?: string
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user: "MovieBuff42",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Absolutely stunning visuals and a compelling storyline. The character development was exceptional, and the plot twists kept me on the edge of my seat. Highly recommended!",
      date: "2 days ago",
      likes: 24,
      dislikes: 2,
      verified: true,
    },
    {
      id: 2,
      user: "CinematicDreamer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      content:
        "Great film with amazing special effects. The only reason I'm not giving it 5 stars is because the middle act dragged a bit. Otherwise, fantastic experience!",
      date: "1 week ago",
      likes: 18,
      dislikes: 3,
      verified: true,
    },
    {
      id: 3,
      user: "new_account_5678",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 1,
      content: "Terrible movie, worst I've ever seen. Don't waste your time.",
      date: "3 hours ago",
      likes: 1,
      dislikes: 15,
      verified: false,
      flagged: true,
      flagReason: "New account, extreme negativity, no specific details",
    },
    {
      id: 4,
      user: "SciFiEnthusiast",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "As a longtime sci-fi fan, this movie delivers on all fronts. The attention to scientific detail while still maintaining an engaging narrative is impressive. The director clearly understands the genre.",
      date: "5 days ago",
      likes: 32,
      dislikes: 1,
      verified: true,
    },
    {
      id: 5,
      user: "movie_fan_2023",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content: "This is the best movie ever made! Everyone must watch it now! Click my profile for amazing deals!",
      date: "1 day ago",
      likes: 3,
      dislikes: 27,
      verified: false,
      flagged: true,
      flagReason: "Promotional content, excessive enthusiasm, call to action",
    },
  ])

  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleSubmitReview = () => {
    if (newReview.trim() === "" || rating === 0) return

    const review: Review = {
      id: reviews.length + 1,
      user: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      rating,
      content: newReview,
      date: "Just now",
      likes: 0,
      dislikes: 0,
      verified: true,
    }

    setReviews([review, ...reviews])
    setNewReview("")
    setRating(0)
  }

  return (
    <div className="bg-zinc-900 p-4 md:p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Reviews & Ratings</h2>
        <div className="flex items-center">
          <Badge className="bg-purple-600 text-white mr-2">
            <Shield className="h-3 w-3 mr-1" />
            AI Protected
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Shield className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-800 text-white border-zinc-700">
                <p className="text-xs">Reviews are monitored by NeoxAI for authenticity</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Write a review */}
      <div className="mb-8 bg-zinc-800 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Write a Review</h3>
        <div className="flex mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="text-gray-400 hover:text-yellow-400 focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  (hoveredStar ? star <= hoveredStar : star <= rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-500"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-400">
            {rating > 0 ? `${rating} out of 5 stars` : "Rate this title"}
          </span>
        </div>
        <Textarea
          placeholder="Share your thoughts about this title..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="bg-zinc-700 border-zinc-600 text-white mb-3 min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitReview}
            disabled={newReview.trim() === "" || rating === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Submit Review
          </Button>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`p-4 rounded-lg ${review.flagged ? "bg-red-900/10 border border-red-900/30" : "bg-zinc-800"}`}
          >
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={review.avatar} alt={review.user} />
                <AvatarFallback>{review.user.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="font-medium text-white mr-2">{review.user}</span>
                  {review.verified && (
                    <Badge variant="outline" className="text-xs bg-green-900/20 text-green-400 border-green-800">
                      Verified
                    </Badge>
                  )}
                  {review.flagged && (
                    <Badge variant="outline" className="text-xs bg-red-900/20 text-red-400 border-red-800 ml-1">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Flagged by AI
                    </Badge>
                  )}
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-300 mb-3">{review.content}</p>

                {review.flagged && (
                  <div className="bg-red-900/20 border border-red-900/30 rounded p-2 mb-3">
                    <p className="text-xs text-red-300">
                      <AlertTriangle className="h-3 w-3 inline mr-1" />
                      AI Flag Reason: {review.flagReason}
                    </p>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-400">
                  <button className="flex items-center mr-4 hover:text-white">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{review.likes}</span>
                  </button>
                  <button className="flex items-center mr-4 hover:text-white">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>{review.dislikes}</span>
                  </button>
                  <button className="hover:text-white">Reply</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

