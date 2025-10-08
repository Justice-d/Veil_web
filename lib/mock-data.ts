import type { Post, Comment } from "./types"

export const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      handle: "SilentOwl23",
      avatar: { color: "#7C3AED", initials: "SI" },
    },
    content:
      "Sometimes I wonder if anyone else feels like they're living two lives - the one everyone sees and the one that exists only in your head. The mask we wear becomes so comfortable that we forget what's underneath.",
    theme: "Confession",
    timestamp: "2h ago",
    likes: 234,
    comments: 45,
    subStories: 12,
    isLiked: false,
    parentId: null,
  },
  {
    id: "2",
    author: {
      handle: "CrimsonFox89",
      avatar: { color: "#EC4899", initials: "CR" },
    },
    content:
      "I quit my job today without a backup plan. Everyone thinks I'm crazy, but for the first time in years, I feel alive. Sometimes the scariest decision is the right one.",
    theme: "Life",
    timestamp: "5h ago",
    likes: 567,
    comments: 89,
    subStories: 23,
    isLiked: true,
    parentId: null,
  },
  {
    id: "3",
    author: {
      handle: "MysticWolf42",
      avatar: { color: "#3B82F6", initials: "MY" },
    },
    content:
      "To the stranger who smiled at me on the subway this morning: you have no idea how much I needed that. Small acts of kindness ripple further than we know.",
    theme: "Gratitude",
    timestamp: "8h ago",
    likes: 892,
    comments: 134,
    subStories: 45,
    isLiked: false,
    parentId: null,
  },
  {
    id: "4",
    author: {
      handle: "VelvetRaven77",
      avatar: { color: "#10B981", initials: "VE" },
    },
    content:
      "I've been pretending to be happy for so long that I forgot what genuine joy feels like. Today I laughed - really laughed - and it felt foreign. I want more of that.",
    theme: "Mental Health",
    timestamp: "12h ago",
    likes: 445,
    comments: 67,
    subStories: 18,
    isLiked: false,
    parentId: null,
  },
  {
    id: "5",
    author: {
      handle: "GoldenEagle15",
      avatar: { color: "#F59E0B", initials: "GO" },
    },
    content:
      "My grandmother passed away yesterday. I never told her how much her stories meant to me. If you love someone, tell them today. Tomorrow isn't guaranteed.",
    theme: "Loss",
    timestamp: "1d ago",
    likes: 1203,
    comments: 234,
    subStories: 67,
    isLiked: true,
    parentId: null,
  },
]

export const mockSubStories: Record<string, Post[]> = {
  "1": [
    {
      id: "1-1",
      author: {
        handle: "FrostTiger56",
        avatar: { color: "#06B6D4", initials: "FR" },
      },
      content:
        "This resonates so deeply. I've been wearing my mask for 15 years. Sometimes I catch myself in the mirror and don't recognize who's looking back.",
      theme: "Confession",
      timestamp: "1h ago",
      likes: 89,
      comments: 12,
      subStories: 3,
      isLiked: false,
      parentId: "1",
    },
    {
      id: "1-2",
      author: {
        handle: "OceanHawk91",
        avatar: { color: "#14B8A6", initials: "OC" },
      },
      content:
        "The mask became my real face. I forgot I was even wearing one until therapy helped me see it. Now I'm slowly learning to take it off, piece by piece.",
      theme: "Confession",
      timestamp: "45m ago",
      likes: 134,
      comments: 23,
      subStories: 7,
      isLiked: true,
      parentId: "1",
    },
  ],
  "2": [
    {
      id: "2-1",
      author: {
        handle: "DesertLynx33",
        avatar: { color: "#F97316", initials: "DE" },
      },
      content:
        "I did the same thing 3 years ago. Best decision of my life. The fear was temporary, but the regret of staying would have been permanent.",
      theme: "Life",
      timestamp: "4h ago",
      likes: 234,
      comments: 45,
      subStories: 12,
      isLiked: false,
      parentId: "2",
    },
  ],
}

export const mockComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: {
        handle: "NeonPanther88",
        avatar: { color: "#8B5CF6", initials: "NE" },
      },
      content: "Thank you for sharing this. I needed to hear it today.",
      timestamp: "30m ago",
      likes: 23,
    },
    {
      id: "c2",
      author: {
        handle: "StormEagle12",
        avatar: { color: "#EF4444", initials: "ST" },
      },
      content: "This is exactly how I feel. The duality is exhausting.",
      timestamp: "1h ago",
      likes: 45,
    },
  ],
}
