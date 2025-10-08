import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/lib/theme-context"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Veil - The social network without faces",
  description:
    "Anonymous social storytelling platform. Share your thoughts, confessions, and experiences without revealing your identity.",
  manifest: "/manifest.json",
  themeColor: "#7C3AED",
  icons: {
    icon: [
      { url: '/veil-logo-purple.png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#7C3AED',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Veil",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  generator: 'v0.app',
  openGraph: {
    title: 'Veil - The social network without faces',
    description: 'Anonymous social storytelling platform. Share your thoughts, confessions, and experiences without revealing your identity.',
    images: ['/veil-logo-black.png'],
    siteName: 'Veil',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veil - The social network without faces',
    description: 'Anonymous social storytelling platform',
    images: ['/veil-logo-black.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
