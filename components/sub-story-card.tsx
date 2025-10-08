"use client"

import type { Post } from "@/lib/types"
import { themeStyles } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, GitBranch, Share2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { PostShareDialog } from "./post-share-dialog"

interface SubStoryCardProps {
  post: Post
  depth?: number
  onLike?: (postId: string) => void
}

export function SubStoryCard({ post, depth = 0, onLike }: SubStoryCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likes)

  const themeStyle = themeStyles.find((t) => t.value === post.theme.toLowerCase().replace(" ", "-"))

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    onLike?.(post.id)
  }

  return (
    <Card className="overflow-hidden border-l-4 border-l-[#7C3AED] bg-muted/30">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-center justify-between">
          <Link href={`/profile/${post.author.handle}`} className="flex items-center gap-3 hover:opacity-80">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: post.author.avatar.color }}
            >
              {post.author.avatar.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{post.author.handle}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <Link href={`/substory/${post.id}`} className="block">
          <div
            className="rounded-lg p-4"
            style={{
              background: themeStyle?.background || "#7C3AED",
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: themeStyle?.textColor || "#ffffff" }}>
              {post.content}
            </p>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-3">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1.5 text-xs ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
            onClick={handleLike}
          >
            <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
            <span>{likeCount}</span>
          </Button>
          <Link href={`/substory/${post.id}#comments`}>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{post.comments}</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
            <GitBranch className="h-3.5 w-3.5" />
            <span>{post.subStories}</span>
          </Button>
        </div>
        <PostShareDialog post={post}>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </PostShareDialog>
      </CardFooter>
    </Card>
  )
}
