"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 2500)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background space-y-8">
      <div className="relative w-32 h-32">
        <Image
          src="/veil-logo-black.png"
          alt="Veil Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your experience...</p>
      </div>
      
      {/* Slogan */}
      <div className="animate-fade-in text-center" style={{ animationDelay: "0.3s", opacity: 0 }}>
        <p className="text-xl font-light tracking-wide text-white/95 md:text-2xl">
          The social network without faces.
        </p>
      </div>

      {/* Loading indicator */}
      <div className="animate-fade-in flex gap-2" style={{ animationDelay: "0.6s", opacity: 0 }}>
        <div className="h-2 w-2 animate-bounce rounded-full bg-white/80" style={{ animationDelay: "0ms" }} />
        <div className="h-2 w-2 animate-bounce rounded-full bg-white/80" style={{ animationDelay: "150ms" }} />
        <div className="h-2 w-2 animate-bounce rounded-full bg-white/80" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  )
}
