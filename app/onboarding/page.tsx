"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const interests = [
  "Life Stories",
  "Confessions",
  "Mental Health",
  "Relationships",
  "Career",
  "Travel",
  "Creativity",
  "Philosophy",
]

const moods = [
  { value: "reflective", label: "Reflective & Thoughtful" },
  { value: "adventurous", label: "Adventurous & Bold" },
  { value: "peaceful", label: "Peaceful & Calm" },
  { value: "passionate", label: "Passionate & Intense" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedHandle, setGeneratedHandle] = useState<string | null>(null)

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleComplete = async () => {
    setIsLoading(true)

    try {
      // Get pending signup data
      const pendingSignup = localStorage.getItem("pendingSignup")
      if (!pendingSignup) {
        router.push("/auth/signup")
        return
      }

      const { email, password } = JSON.parse(pendingSignup)

      localStorage.setItem(
        "userPreferences",
        JSON.stringify({
          interests: selectedInterests,
          mood: selectedMood,
        }),
      )

      // Generate personalized handle using AI
      const response = await fetch("/api/generate-handle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interests: selectedInterests,
          mood: selectedMood,
        }),
      })

      const { handle } = await response.json()

      // Create user with personalized handle
      const user = await signup(email, password, handle)
      setGeneratedHandle(user.handle)

      // Clean up
      localStorage.removeItem("pendingSignup")

      // Show handle for 2 seconds before redirecting
      setTimeout(() => {
        router.push("/home")
      }, 2500)
    } catch (err) {
      console.error("[v0] Onboarding error:", err)
      setIsLoading(false)
    }
  }

  if (generatedHandle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#7C3AED] p-4">
        <Card className="w-full max-w-md border-white/20 bg-white/10 text-white backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to Veil!</CardTitle>
            <CardDescription className="text-white/80">Your personalized identity has been created</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="rounded-lg bg-white/20 p-6">
              <p className="mb-2 text-sm text-white/70">Your anonymous handle:</p>
              <p className="text-3xl font-bold">{generatedHandle}</p>
            </div>
            <p className="text-sm text-white/80">
              This handle was crafted based on your preferences. It's your unique identity on Veil!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#7C3AED] p-4">
      <Card className="w-full max-w-2xl border-white/20 bg-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Tell Us About Yourself</CardTitle>
          <CardDescription className="text-white/80">
            Help us create your perfect anonymous identity (Step {step} of 2)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <Label className="text-lg text-white">What topics interest you?</Label>
              <p className="text-sm text-white/70">Select all that apply</p>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center space-x-2 rounded-lg border border-white/20 bg-white/5 p-3"
                  >
                    <Checkbox
                      id={interest}
                      checked={selectedInterests.includes(interest)}
                      onCheckedChange={() => handleInterestToggle(interest)}
                      className="border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-[#7C3AED]"
                    />
                    <label htmlFor={interest} className="flex-1 cursor-pointer text-sm text-white">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={selectedInterests.length === 0}
                className="w-full bg-white text-[#7C3AED] hover:bg-white/90"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-lg text-white">What's your vibe?</Label>
              <p className="text-sm text-white/70">Choose the mood that resonates with you</p>
              <RadioGroup value={selectedMood} onValueChange={setSelectedMood} className="space-y-3">
                {moods.map((mood) => (
                  <div
                    key={mood.value}
                    className="flex items-center space-x-3 rounded-lg border border-white/20 bg-white/5 p-4"
                  >
                    <RadioGroupItem
                      value={mood.value}
                      id={mood.value}
                      className="border-white/40 text-white data-[state=checked]:border-white data-[state=checked]:bg-white"
                    />
                    <Label htmlFor={mood.value} className="flex-1 cursor-pointer text-white">
                      {mood.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!selectedMood || isLoading}
                  className="flex-1 bg-white text-[#7C3AED] hover:bg-white/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Complete"
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
