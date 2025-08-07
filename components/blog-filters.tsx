"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Calendar, Clock } from "lucide-react"
import { type BlogPostMeta } from "@/lib/markdown"

interface BlogFiltersProps {
  categories: string[]
  allPosts: BlogPostMeta[]
}

export function BlogFilters({ categories, allPosts }: BlogFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  // Filter and sort posts on client side
  let filteredPosts = allPosts

  // Apply search filter
  if (searchTerm) {
    const lowercaseQuery = searchTerm.toLowerCase()
    filteredPosts = filteredPosts.filter((post) => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt?.toLowerCase().includes(lowercaseQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  // Apply category filter
  if (selectedCategory !== "All") {
    filteredPosts = filteredPosts.filter((post) => post.category === selectedCategory)
  }

  // Apply sorting
  filteredPosts = filteredPosts.sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })

  return (
    <>
      {/* Filters */}
      <section className="relative z-10">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80 min-w-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-white/60 text-lg mb-4">No posts found</div>
              <p className="text-white/40">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group glass-morphism p-6 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-white/10"
                >
                  {/* Post Meta */}
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Title */}
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    <Link href={`/blog/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Post Excerpt */}
                  <p className="text-white/80 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-6">
                    <div>
                      <div className="text-white font-medium">{post.author.name}</div>
                      <div className="text-white/60 text-sm">{post.author.role}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read More Button */}
                  <Button asChild className="w-full button-epic">
                    <Link href={`/blog/${post.id}`}>
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
} 