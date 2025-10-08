"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNav } from "@/components/bottom-nav"
import { SubStoryCard } from "@/components/sub-story-card"
import { CommentCard } from "@/components/comment-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockSubStories, mockComments } from "@/lib/mock-data"
import { ArrowLeft, MessageCircle, Send } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import type { Comment } from "@/lib/types"

export default function SubStoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const subStoryId = params.id as string

  // Find the sub-story across all parent posts
  let subStory = null
  for (const parentId in mockSubStories) {
    const found = mockSubStories[parentId].find((s) => s.id === subStoryId)
    if (found) {
      subStory = found
      break
    }
  }

  const [localComments, setLocalComments] = useState<Comment[]>(mockComments[subStoryId] || [])
  const [newComment, setNewComment] = useState("")

  if (!subStory) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen items-center justify-center">
          <p>Sub-story not found</p>
        </div>
      </AuthGuard>
    )
  }

  const handleAddComment = () => {
    if (newComment.trim() && user) {
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        author: {
          handle: user.handle,
          avatar: user.avatar,
        },
        content: newComment,
        timestamp: "Just now",
        likes: 0,
        isLiked: false,
      }
      setLocalComments([newCommentObj, ...localComments])
      setNewComment("")
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-[#7C3AED]">Sub-story</h1>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-6">
          {/* Sub-story */}
          <div className="mb-6">
            <SubStoryCard post={subStory} />
          </div>

          {/* Comments Section */}
          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-1">
              <TabsTrigger value="comments" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Comments ({localComments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments" className="space-y-6">
              {/* Add Comment Form */}
              <div className="space-y-3 rounded-lg border bg-card p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: user?.avatar.color }}
                  >
                    {user?.avatar.initials}
                  </div>
                  <p className="text-sm font-medium text-foreground">Add a comment</p>
                </div>
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90"
                  >
                    <Send className="mr-2 h-3.5 w-3.5" />
                    Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {localComments.length > 0 ? (
                  localComments.map((comment) => <CommentCard key={comment.id} comment={comment} />)
                ) : (
                  <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <MessageCircle className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium text-muted-foreground">No comments yet</p>
                      <p className="mt-1 text-xs text-muted-foreground">Be the first to comment</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  )
}
