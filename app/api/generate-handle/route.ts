import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

// Initialize Groq with API key
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request) {
  try {
    const { interests, mood } = await req.json()

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Generate a creative, anonymous username handle for a social storytelling app called Veil. 

User preferences:
- Interests: ${interests.join(", ")}
- Mood/Vibe: ${mood}

Requirements:
- Format: AdjectiveNoun + 2-digit number (e.g., "MysticWanderer47", "SilentDreamer23")
- The adjective and noun should reflect their interests and mood
- Make it mysterious, poetic, and fitting for anonymous storytelling
- No spaces, use PascalCase
- End with a random 2-digit number

Return ONLY the handle, nothing else.`,
    })

    const handle = text.trim()

    return Response.json({ handle })
  } catch (error) {
    console.error("[v0] Generate handle error:", error)
    // Fallback to random handle if AI fails
    const fallbackHandle = `Anonymous${Math.floor(Math.random() * 100)}`
    return Response.json({ handle: fallbackHandle })
  }
}
