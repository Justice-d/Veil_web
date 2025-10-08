export interface User {
  id: string
  handle: string
  avatar: { color: string; initials: string }
  createdAt: string
}

export interface Author {
  handle: string
  avatar: { color: string; initials: string }
}

export interface Post {
  id: string
  author: Author
  content: string
  theme: string
  timestamp: string
  likes: number
  comments: number
  subStories: number
  isLiked: boolean
  parentId?: string
}

export interface Comment {
  id: string
  author: Author
  content: string
  timestamp: string
  likes: number
}

export interface ThemeStyle {
  value: string
  label: string
  color: string
  background: string
  textColor: string
}

export const themeStyles: ThemeStyle[] = [
  {
    value: "confession",
    label: "Confession",
    color: "#7C3AED",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
  },
  {
    value: "life",
    label: "Life",
    color: "#EC4899",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    textColor: "#ffffff",
  },
  {
    value: "gratitude",
    label: "Gratitude",
    color: "#10B981",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    textColor: "#ffffff",
  },
  {
    value: "mental-health",
    label: "Mental Health",
    color: "#3B82F6",
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    textColor: "#1f2937",
  },
  {
    value: "loss",
    label: "Loss",
    color: "#6B7280",
    background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    textColor: "#1f2937",
  },
  {
    value: "love",
    label: "Love",
    color: "#EF4444",
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    textColor: "#ffffff",
  },
  {
    value: "work",
    label: "Work",
    color: "#F59E0B",
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    textColor: "#1f2937",
  },
  {
    value: "random",
    label: "Random",
    color: "#8B5CF6",
    background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    textColor: "#ffffff",
  },
]
