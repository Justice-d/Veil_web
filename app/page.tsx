"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { useAuth } from "@/lib/auth-context"

export default function Home() {
  const [showLoading, setShowLoading] = useState(true)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!showLoading && !isLoading) {
      if (user) {
        router.push("/home")
      } else {
        router.push("/auth/login")
      }
    }
  }, [showLoading, isLoading, user, router])

  return <>{showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}</>
}
