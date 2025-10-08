// Random handle generation utilities
const adjectives = [
  "Blue",
  "Silent",
  "Swift",
  "Mystic",
  "Shadow",
  "Crimson",
  "Golden",
  "Silver",
  "Velvet",
  "Cosmic",
  "Lunar",
  "Solar",
  "Frost",
  "Storm",
  "Ember",
  "Ocean",
  "Forest",
  "Desert",
  "Arctic",
  "Neon",
]

const animals = [
  "Fox",
  "Owl",
  "Wolf",
  "Raven",
  "Eagle",
  "Tiger",
  "Panther",
  "Falcon",
  "Hawk",
  "Bear",
  "Lion",
  "Lynx",
  "Cobra",
  "Phoenix",
  "Dragon",
  "Serpent",
  "Jaguar",
  "Leopard",
  "Cheetah",
  "Viper",
]

const avatarColors = [
  "#7C3AED", // Purple
  "#EC4899", // Pink
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#14B8A6", // Teal
]

export function generateRandomHandle(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  const number = Math.floor(Math.random() * 100)
  return `${adjective}${animal}${number}`
}

export function generateAvatar(handle: string): { color: string; initials: string } {
  // Use handle to consistently generate same avatar
  const hash = handle.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const colorIndex = hash % avatarColors.length
  const initials = handle.slice(0, 2).toUpperCase()

  return {
    color: avatarColors[colorIndex],
    initials,
  }
}

export interface User {
  id: string
  handle: string
  avatar: { color: string; initials: string }
  createdAt: string
}

export function createUser(email: string, password: string): User {
  const handle = generateRandomHandle()
  const avatar = generateAvatar(handle)

  return {
    id: crypto.randomUUID(),
    handle,
    avatar,
    createdAt: new Date().toISOString(),
  }
}
