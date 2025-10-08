"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNav } from "@/components/bottom-nav"
import { PostCard } from "@/components/post-card"
import { SubStoryCard } from "@/components/sub-story-card"
import { CommentCard } from "@/components/comment-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockPosts, mockSubStories, mockComments } from "@/lib/mock-data"
import { ArrowLeft, GitBranch, MessageCircle, Send } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import type { Post, Comment } from "@/lib/types"

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const postId = params.id as string

  const post = mockPosts.find((p) => p.id === postId)

  const [localSubStories, setLocalSubStories] = useState<Post[]>(mockSubStories[postId] || [])
  const [localComments, setLocalComments] = useState<Comment[]>(mockComments[postId] || [])

  const [newSubStory, setNewSubStory] = useState("")
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("substories")

  if (!post) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen items-center justify-center">
          <p>Post not found</p>
        </div>
      </AuthGuard>
    )
  }

  const handleAddSubStory = () => {
    if (newSubStory.trim() && user) {
      const newSubStoryObj: Post = {
        id: `substory-${Date.now()}`,
        author: {
          handle: user.handle,
          avatar: user.avatar,
        },
        content: newSubStory,
        theme: post.theme, // Inherit theme from parent post
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        subStories: 0,
        isLiked: false,
        visibility: post.visibility,
      }
      setLocalSubStories([newSubStoryObj, ...localSubStories])
      setNewSubStory("")
    }
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
            <h1 className="text-xl font-bold text-[#7C3AED]">Story</h1>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-6">
          {/* Main Post */}
          <div className="mb-6">
            <PostCard post={post} />
          </div>

          {/* Tabs for Sub-stories and Comments */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="substories" className="gap-2">
                <GitBranch className="h-4 w-4" />
                Sub-stories ({localSubStories.length})
              </TabsTrigger>
              <TabsTrigger value="comments" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Comments ({localComments.length})
              </TabsTrigger>
            </TabsList>

            {/* Sub-stories Tab */}
            <TabsContent value="substories" className="space-y-6">
              {/* Add Sub-story Form */}
              <div className="space-y-3 rounded-lg border bg-card p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: user?.avatar.color }}
                  >
                    {user?.avatar.initials}
                  </div>
                  <p className="text-sm font-medium text-foreground">Add your story to the chain</p>
                </div>
                <Textarea
                  placeholder="Share your related experience or perspective..."
                  value={newSubStory}
                  onChange={(e) => setNewSubStory(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Your sub-story will be linked to this post</p>
                  <Button
                    size="sm"
                    onClick={handleAddSubStory}
                    disabled={!newSubStory.trim()}
                    className="bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90"
                  >
                    <Send className="mr-2 h-3.5 w-3.5" />
                    Add to Chain
                  </Button>
                </div>
              </div>

              {/* Sub-stories List */}
              <div className="space-y-4">
                {localSubStories.length > 0 ? (
                  localSubStories.map((subStory) => <SubStoryCard key={subStory.id} post={subStory} />)
                ) : (
                  <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <GitBranch className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium text-muted-foreground">No sub-stories yet</p>
                      <p className="mt-1 text-xs text-muted-foreground">Be the first to add to this story chain</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Comments Tab */}
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
