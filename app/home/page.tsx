"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { PostCard } from "@/components/post-card"
import { BottomNav } from "@/components/bottom-nav"
import { mockPosts } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import type { Post } from "@/lib/types"

export default function HomePage() {
  const [posts] = useState(mockPosts)
  const [forYouPosts, setForYouPosts] = useState<Post[]>([])
  const [isLoadingForYou, setIsLoadingForYou] = useState(false)
  const [viewedPostIds] = useState<string[]>([])

  useEffect(() => {
    loadForYouFeed()
  }, [])

  const loadForYouFeed = async () => {
    setIsLoadingForYou(true)
    try {
      // Get user preferences from localStorage (from onboarding)
      const userPrefs = localStorage.getItem("userPreferences")
      const prefs = userPrefs ? JSON.parse(userPrefs) : {}

      const response = await fetch("/api/recommend-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInterests: prefs.interests || [],
          userMood: prefs.mood || "",
          viewedPostIds,
        }),
      })

      const { posts: recommendedPosts } = await response.json()
      setForYouPosts(recommendedPosts)
    } catch (error) {
      console.error("[v0] Failed to load For You feed:", error)
      // Fallback to regular posts
      setForYouPosts(mockPosts)
    } finally {
      setIsLoadingForYou(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-bold text-[#7C3AED]">Veil</h1>
            <p className="text-sm text-muted-foreground">The social network without faces</p>
          </div>
        </header>

        {/* Feed Tabs */}
        <main className="mx-auto max-w-2xl px-4 py-6">
          <Tabs defaultValue="foryou" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="foryou">For You</TabsTrigger>
              <TabsTrigger value="public">Public</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
            </TabsList>

            <TabsContent value="foryou" className="space-y-4">
              {isLoadingForYou ? (
                <div className="flex min-h-[400px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />
                </div>
              ) : (
                <>
                  <div className="rounded-lg bg-[#7C3AED]/10 p-4 mb-4">
                    <p className="text-sm text-[#7C3AED] font-medium">✨ Personalized stories curated just for you</p>
                  </div>
                  {forYouPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </>
              )}
            </TabsContent>

            <TabsContent value="public" className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>

            <TabsContent value="friends" className="space-y-4">
              <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-lg font-medium text-muted-foreground">No friends yet</p>
                  <p className="mt-2 text-sm text-muted-foreground">Follow other users to see their stories here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  )
}
