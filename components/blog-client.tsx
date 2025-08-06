"use client"

import { useState, useEffect } from "react"
import { BlogFilters } from "@/components/blog-filters"
import type { BlogPostMeta } from "@/lib/markdown"

interface BlogClientProps {
  markdownPosts: BlogPostMeta[]
}

export function BlogClient({ markdownPosts }: BlogClientProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Use only markdown posts
  const allPosts = markdownPosts

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(allPosts.map(post => post.category)))]

  return (
    <>
      {/* Filters and Blog Posts Grid */}
      {isLoading ? (
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white/80">Loading blog posts...</p>
            </div>
          </div>
        </div>
      ) : (
        <BlogFilters categories={categories} allPosts={allPosts} />
      )}
    </>
  )
} 