"use client"

import { useState, useEffect } from "react"
import { BlogFilters } from "@/components/blog-filters"
import type { BlogPostMeta } from "@/lib/markdown"

interface BlogClientProps {
  markdownPosts: BlogPostMeta[]
}

export function BlogClient({ markdownPosts }: BlogClientProps) {
  const [approvedArticles, setApprovedArticles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchApprovedArticles()
  }, [])

  const fetchApprovedArticles = async () => {
    try {
      const response = await fetch('/api/blog-posts/')
      const data = await response.json()
      
      if (data.success) {
        setApprovedArticles(data.posts || [])
      }
    } catch (error) {
      console.error('Error fetching approved articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Combine markdown posts with approved articles
  const allPosts = [
    ...markdownPosts,
    ...approvedArticles.map(article => ({
      id: article.fileIdentifier,
      slug: article.fileIdentifier,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      tags: article.tags ? article.tags.split(',').map((tag: string) => tag.trim()) : [],
      author: {
        name: article.author || 'Community Member',
        avatar: '/placeholder-user.jpg',
        role: 'Contributor'
      },
      date: article.date,
      content: article.content,
      readTime: '5 min read',
      image: '/placeholder.jpg',
      isApprovedArticle: true // Flag to identify approved articles
    }))
  ]

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(allPosts.map(post => post.category)))]

  return (
    <>
      {/* Community Articles Badge */}
      {approvedArticles.length > 0 && (
        <section className="relative z-10">
          <div className="container mx-auto px-4 -mt-8 mb-8">
            <div className="text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-300 border border-green-400/30">
                {approvedArticles.length} new community articles
              </span>
            </div>
          </div>
        </section>
      )}

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