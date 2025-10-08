"use client"

import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { LogOut, Moon, Sun, Monitor, User, Shield, Bell, HelpCircle } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-bold text-[#7C3AED]">Settings</h1>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-6">
          <div className="space-y-6">
            {/* Account Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account
                </CardTitle>
                <CardDescription>Your anonymous identity on Veil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white"
                    style={{ backgroundColor: user?.avatar.color }}
                  >
                    {user?.avatar.initials}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{user?.handle}</p>
                    <p className="text-sm text-muted-foreground">Anonymous storyteller</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize how Veil looks on your device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <RadioGroup value={theme} onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex flex-1 cursor-pointer items-center gap-3">
                        <Sun className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Light</p>
                          <p className="text-sm text-muted-foreground">Bright and clear</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex flex-1 cursor-pointer items-center gap-3">
                        <Moon className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Dark</p>
                          <p className="text-sm text-muted-foreground">Easy on the eyes</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="flex flex-1 cursor-pointer items-center gap-3">
                        <Monitor className="h-4 w-4" />
                        <div>
                          <p className="font-medium">System</p>
                          <p className="text-sm text-muted-foreground">Match device settings</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Safety
                </CardTitle>
                <CardDescription>Control your privacy and safety settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="mr-2 h-4 w-4" />
                  Blocked Users
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Bell className="mr-2 h-4 w-4" />
                  Notification Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Support Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Support
                </CardTitle>
                <CardDescription>Get help and learn more about Veil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help Center
                </Button>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>About Veil:</strong> The social network without faces. Share your stories anonymously and
                    connect through authentic experiences.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Logout Section */}
            {!showLogoutConfirm ? (
              <Button variant="destructive" className="w-full" size="lg" onClick={() => setShowLogoutConfirm(true)}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            ) : (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <p className="mb-4 text-center font-medium text-foreground">Are you sure you want to log out?</p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setShowLogoutConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  )
}
