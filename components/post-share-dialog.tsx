"use client"

import type React from "react"

import { useState } from "react"
import type { Post } from "@/lib/types"
import { themeStyles } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Share2, Download, Instagram, Twitter, WheatIcon as WhatsApp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PostShareDialogProps {
  post: Post
  children?: React.ReactNode
}

export function PostShareDialog({ post, children }: PostShareDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const themeStyle = themeStyles.find((t) => t.value === post.theme.toLowerCase().replace(" ", "-"))

  const handleDownload = async () => {
    // Create a canvas element to render the post as an image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 1080
    canvas.height = 1080

    // Draw background gradient
    if (themeStyle) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      // Parse gradient colors from CSS gradient string
      const colors = themeStyle.background.match(/#[0-9a-f]{6}/gi) || ["#7C3AED", "#764ba2"]
      gradient.addColorStop(0, colors[0])
      gradient.addColorStop(1, colors[1])
      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = "#7C3AED"
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw Veil logo/branding at top
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.font = "bold 48px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Veil", canvas.width / 2, 100)

    // Draw tagline
    ctx.font = "24px sans-serif"
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.fillText("The social network without faces", canvas.width / 2, 150)

    // Draw post content
    ctx.fillStyle = themeStyle?.textColor || "#ffffff"
    ctx.font = "32px sans-serif"
    ctx.textAlign = "center"

    // Word wrap the content
    const maxWidth = 900
    const lineHeight = 50
    const words = post.content.split(" ")
    let line = ""
    let y = 400

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " "
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, canvas.width / 2, y)
        line = words[i] + " "
        y += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, canvas.width / 2, y)

    // Draw author handle at bottom
    ctx.font = "28px sans-serif"
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.fillText(`— ${post.author.handle}`, canvas.width / 2, 950)

    // Draw theme badge
    ctx.font = "24px sans-serif"
    ctx.fillText(post.theme, canvas.width / 2, 1000)

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `veil-story-${post.id}.png`
      a.click()
      URL.revokeObjectURL(url)

      toast({
        title: "Downloaded!",
        description: "Your story card has been saved.",
      })
    })
  }

  const handleShare = async (platform?: string) => {
    const shareData = {
      title: "Veil Story",
      text: `${post.content.substring(0, 100)}... - ${post.author.handle} on Veil`,
      url: window.location.href,
    }

    if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`
      window.open(twitterUrl, "_blank")
    } else if (platform === "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`
      window.open(whatsappUrl, "_blank")
    } else if (navigator.share) {
      try {
        await navigator.share(shareData)
        toast({
          title: "Shared!",
          description: "Story shared successfully.",
        })
      } catch (err) {
        console.log("[v0] Share cancelled")
      }
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(shareData.url)
      toast({
        title: "Link copied!",
        description: "Story link copied to clipboard.",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Share2 className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Story</DialogTitle>
          <DialogDescription>Share this anonymous story with others</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Button onClick={handleDownload} className="w-full justify-start gap-3 bg-transparent" variant="outline">
            <Download className="h-5 w-5" />
            Download as Image
          </Button>
          <Button onClick={() => handleShare("twitter")} className="w-full justify-start gap-3" variant="outline">
            <Twitter className="h-5 w-5" />
            Share on Twitter/X
          </Button>
          <Button onClick={() => handleShare("whatsapp")} className="w-full justify-start gap-3" variant="outline">
            <WhatsApp className="h-5 w-5" />
            Share on WhatsApp
          </Button>
          <Button onClick={() => handleShare("instagram")} className="w-full justify-start gap-3" variant="outline">
            <Instagram className="h-5 w-5" />
            Share on Instagram
          </Button>
          <Button onClick={() => handleShare()} className="w-full justify-start gap-3" variant="outline">
            <Share2 className="h-5 w-5" />
            Share via...
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
