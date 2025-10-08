"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/auth-context"
import { PostCard } from "@/components/post-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { mockPosts } from "@/lib/mock-data"
import { Calendar } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isFollowing] = useState(false)

  // Filter posts by current user (in real app, would fetch from API)
  const userPosts = mockPosts.filter((post) => post.author.handle === user?.handle)

  const stats = {
    posts: userPosts.length,
    followers: 234,
    following: 156,
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-bold text-[#7C3AED]">Profile</h1>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-6">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                {/* Avatar */}
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: user?.avatar.color }}
                >
                  {user?.avatar.initials}
                </div>

                {/* Handle */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{user?.handle}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Anonymous storyteller</p>
                </div>

                {/* Stats */}
                <div className="flex w-full justify-around border-t pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{stats.posts}</p>
                    <p className="text-xs text-muted-foreground">Stories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{stats.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{stats.following}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {new Date(user?.createdAt || "").toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Tabs */}
          <Tabs defaultValue="stories" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="stories">My Stories</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
            </TabsList>

            <TabsContent value="stories" className="space-y-4">
              {userPosts.length > 0 ? (
                userPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <p className="text-lg font-medium text-muted-foreground">No stories yet</p>
                    <p className="mt-2 text-sm text-muted-foreground">Share your first anonymous story</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="liked" className="space-y-4">
              {mockPosts.filter((p) => p.isLiked).length > 0 ? (
                mockPosts.filter((p) => p.isLiked).map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <p className="text-lg font-medium text-muted-foreground">No liked stories</p>
                    <p className="mt-2 text-sm text-muted-foreground">Stories you like will appear here</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  )
}
