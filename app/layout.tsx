import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechClub - College Technology Blog",
  description:
    "Join our community of passionate developers, designers, and tech enthusiasts. Share knowledge, build projects, and shape the future of technology.",
  keywords: ["technology", "programming", "web development", "college", "tech club", "blog"],
  authors: [{ name: "TechClub Team" }],
  openGraph: {
    title: "TechClub - College Technology Blog",
    description: "Join our community of passionate developers, designers, and tech enthusiasts.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
