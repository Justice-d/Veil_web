"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/auth-context"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockPosts } from "@/lib/mock-data"
import { ArrowLeft, UserPlus, UserMinus } from "lucide-react"

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user: currentUser } = useAuth()
  const handle = params.handle as string

  const [isFollowing, setIsFollowing] = useState(false)

  // Find user by handle (in real app, would fetch from API)
  const profilePost = mockPosts.find((p) => p.author.handle === handle)
  const profileUser = profilePost?.author

  if (!profileUser) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen items-center justify-center">
          <p>User not found</p>
        </div>
      </AuthGuard>
    )
  }

  const isOwnProfile = currentUser?.handle === handle
  const userPosts = mockPosts.filter((post) => post.author.handle === handle)

  const stats = {
    posts: userPosts.length,
    followers: Math.floor(Math.random() * 500) + 50,
    following: Math.floor(Math.random() * 300) + 20,
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
    console.log("[v0] Follow toggled:", !isFollowing)
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
            <h1 className="text-xl font-bold text-[#7C3AED]">{handle}</h1>
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
                  style={{ backgroundColor: profileUser.avatar.color }}
                >
                  {profileUser.avatar.initials}
                </div>

                {/* Handle */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{profileUser.handle}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Anonymous storyteller</p>
                </div>

                {/* Follow Button */}
                {!isOwnProfile && (
                  <Button
                    onClick={handleFollowToggle}
                    className={`w-full max-w-xs ${
                      isFollowing
                        ? "border-[#7C3AED] bg-transparent text-[#7C3AED] hover:bg-[#7C3AED]/10"
                        : "bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90"
                    }`}
                    variant={isFollowing ? "outline" : "default"}
                  >
                    {isFollowing ? (
                      <>
                        <UserMinus className="mr-2 h-4 w-4" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Follow
                      </>
                    )}
                  </Button>
                )}

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
              </div>
            </CardContent>
          </Card>

          {/* User Posts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Stories by {handle}</h3>
            {userPosts.length > 0 ? (
              userPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-lg font-medium text-muted-foreground">No stories yet</p>
                </div>
              </div>
            )}
          </div>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  )
}
