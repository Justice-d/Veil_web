"use client"

import type { Comment } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"

interface CommentCardProps {
  comment: Comment
}

export function CommentCard({ comment }: CommentCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(comment.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <Card className="overflow-hidden bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: comment.author.avatar.color }}
          >
            {comment.author.avatar.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{comment.author.handle}</p>
            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <p className="text-sm leading-relaxed text-foreground">{comment.content}</p>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1.5 text-xs ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
          onClick={handleLike}
        >
          <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
          <span>{likeCount}</span>
        </Button>
      </CardContent>
    </Card>
  )
}
