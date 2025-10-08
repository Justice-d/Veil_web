"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/auth-context"
import { themeStyles } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Send } from "lucide-react"

const MAX_CHARACTERS = 500

export default function CreatePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [content, setContent] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("confession")
  const [visibility, setVisibility] = useState<"public" | "friends">("public")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const characterCount = content.length
  const isOverLimit = characterCount > MAX_CHARACTERS
  const canSubmit = content.trim().length > 0 && !isOverLimit

  const selectedThemeStyle = themeStyles.find((t) => t.value === selectedTheme)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, this would save to database
    console.log("[v0] Creating post:", {
      author: user?.handle,
      content,
      theme: selectedTheme,
      visibility,
    })

    setIsSubmitting(false)
    router.push("/home")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-bold text-[#7C3AED]">Create Story</h1>
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Author Preview */}
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: user?.avatar.color }}
                >
                  {user?.avatar.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{user?.handle}</p>
                  <p className="text-xs text-muted-foreground">Posting anonymously</p>
                </div>
              </CardContent>
            </Card>

            {/* Content Input */}
            <div className="space-y-2">
              <Label htmlFor="content">Your Story</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, confessions, or experiences anonymously..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] resize-none text-base"
                autoFocus
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Be authentic, be anonymous</span>
                <span className={`${isOverLimit ? "text-destructive" : "text-muted-foreground"}`}>
                  {characterCount}/{MAX_CHARACTERS}
                </span>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-3">
              <Label>Theme</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {themeStyles.map((theme) => (
                  <button
                    key={theme.value}
                    type="button"
                    onClick={() => setSelectedTheme(theme.value)}
                    className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                      selectedTheme === theme.value
                        ? "border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED]"
                        : "border-border bg-card text-foreground hover:border-[#7C3AED]/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.color }} />
                      {theme.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {content && selectedThemeStyle && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div
                  className="rounded-lg p-6"
                  style={{
                    background: selectedThemeStyle.background,
                  }}
                >
                  <p className="leading-relaxed" style={{ color: selectedThemeStyle.textColor }}>
                    {content}
                  </p>
                </div>
              </div>
            )}

            {/* Visibility Selection */}
            <div className="space-y-3">
              <Label>Visibility</Label>
              <RadioGroup value={visibility} onValueChange={(value) => setVisibility(value as "public" | "friends")}>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Public</p>
                      <p className="text-sm text-muted-foreground">Anyone on Veil can see this story</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Friends Only</p>
                      <p className="text-sm text-muted-foreground">Only people you follow can see this</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Publish Story
                </>
              )}
            </Button>
          </form>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  )
}
