"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "./auth-utils"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, customHandle?: string) => Promise<User>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("veil_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, customHandle?: string): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Import dynamically to avoid SSR issues
    const { createUser, generateAvatar } = await import("./auth-utils")

    let newUser: User
    if (customHandle) {
      // Use custom handle from onboarding
      newUser = {
        id: crypto.randomUUID(),
        handle: customHandle,
        avatar: generateAvatar(customHandle),
        createdAt: new Date().toISOString(),
      }
    } else {
      // Fallback to random handle
      newUser = createUser(email, password)
    }

    // Store user credentials (in real app, this would be backend)
    const users = JSON.parse(localStorage.getItem("veil_users") || "[]")
    users.push({ email, password, user: newUser })
    localStorage.setItem("veil_users", JSON.stringify(users))

    // Set current user
    localStorage.setItem("veil_user", JSON.stringify(newUser))
    setUser(newUser)

    return newUser
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check credentials
    const users = JSON.parse(localStorage.getItem("veil_users") || "[]")
    const userRecord = users.find((u: any) => u.email === email && u.password === password)

    if (userRecord) {
      localStorage.setItem("veil_user", JSON.stringify(userRecord.user))
      setUser(userRecord.user)
      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem("veil_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
