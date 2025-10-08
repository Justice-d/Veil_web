import { generateText } from "ai"
import { mockPosts } from "@/lib/mock-data"
import { createGroq } from "@ai-sdk/groq"

// Initialize Groq with API key
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request) {
  try {
    const { userInterests, userMood, viewedPostIds } = await req.json()

    // Get posts user hasn't seen yet
    const availablePosts = mockPosts.filter((post) => !viewedPostIds.includes(post.id))

    if (availablePosts.length === 0) {
      return Response.json({ posts: [] })
    }

    // Use AI to rank posts based on user preferences
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `You are a content recommendation AI for Veil, an anonymous social storytelling app.

User Profile:
- Interests: ${userInterests?.join(", ") || "General"}
- Mood: ${userMood || "Neutral"}

Available Posts:
${availablePosts.map((post, idx) => `${idx + 1}. Theme: ${post.theme}, Preview: "${post.content.slice(0, 100)}..."`).join("\n")}

Task: Rank these posts from most to least relevant for this user. Consider:
- Theme alignment with interests
- Emotional tone matching mood
- Story engagement potential

Return ONLY a comma-separated list of post numbers in order of relevance (e.g., "3,1,5,2,4").`,
    })

    // Parse AI response and reorder posts
    const rankings = text
      .trim()
      .split(",")
      .map((n) => Number.parseInt(n.trim()) - 1)
      .filter((idx) => idx >= 0 && idx < availablePosts.length)

    const recommendedPosts = rankings.map((idx) => availablePosts[idx]).filter(Boolean)

    // Add any remaining posts that weren't ranked
    const rankedIds = new Set(recommendedPosts.map((p) => p.id))
    const remaining = availablePosts.filter((p) => !rankedIds.has(p.id))

    return Response.json({ posts: [...recommendedPosts, ...remaining] })
  } catch (error) {
    console.error("[v0] Recommend posts error:", error)
    // Fallback to random order
    const shuffled = [...mockPosts].sort(() => Math.random() - 0.5)
    return Response.json({ posts: shuffled })
  }
}
