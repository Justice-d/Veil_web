"use client"

import type React from "react"

import type { Post } from "@/lib/types"
import { themeStyles } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, GitBranch, Share2, UserPlus, UserCheck } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { PostShareDialog } from "./post-share-dialog"
import { useAuth } from "@/lib/auth-context"

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
}

export function PostCard({ post, onLike }: PostCardProps) {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [isFollowing, setIsFollowing] = useState(false)

  const themeStyle = themeStyles.find((t) => t.value === post.theme.toLowerCase().replace(" ", "-"))

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    onLike?.(post.id)
  }

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFollowing(!isFollowing)
  }

  const isOwnPost = user?.handle === post.author.handle

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-center justify-between">
          <Link href={`/profile/${post.author.handle}`} className="flex items-center gap-3 hover:opacity-80">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: post.author.avatar.color }}
            >
              {post.author.avatar.initials}
            </div>
            <div>
              <p className="font-semibold text-foreground">{post.author.handle}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#7C3AED]/10 px-3 py-1 text-xs font-medium text-[#7C3AED]">
              {post.theme}
            </span>
            {!isOwnPost && (
              <Button
                size="sm"
                variant={isFollowing ? "outline" : "default"}
                className={isFollowing ? "gap-1" : "gap-1 bg-[#7C3AED] hover:bg-[#7C3AED]/90"}
                onClick={handleFollow}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="h-3 w-3" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-3 w-3" />
                    Follow
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <Link href={`/post/${post.id}`} className="block">
          <div
            className="rounded-lg p-6"
            style={{
              background: themeStyle?.background || "#7C3AED",
            }}
          >
            <p className="leading-relaxed" style={{ color: themeStyle?.textColor || "#ffffff" }}>
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
            className={`gap-2 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{likeCount}</span>
          </Button>
          <Link href={`/post/${post.id}#comments`}>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments}</span>
            </Button>
          </Link>
          <Link href={`/post/${post.id}#substories`}>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <GitBranch className="h-4 w-4" />
              <span className="text-sm">{post.subStories}</span>
            </Button>
          </Link>
        </div>
        <PostShareDialog post={post}>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Share2 className="h-4 w-4" />
          </Button>
        </PostShareDialog>
      </CardFooter>
    </Card>
  )
}
