"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Clock, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { BackgroundWrapper } from "@/components/background-wrapper"

// Consistent date formatting function
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}/${day}/${year}`
}

// Blog posts data - same as in [slug]/page.tsx
const blogPosts = [
  {
    slug: "linux-commands",
    title: "Linux Commands Documentation: Essential Commands for Developers",
    excerpt: "A comprehensive guide to essential Linux commands that every developer should know. From file management to system administration, master the command line interface.",
    author: {
      name: "Developers Club Team",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "System Administrator",
    },
    category: "",
    date: "2025-01-20",
    readTime: "25 min read",
    image: "/linux-commands-blog.png",
    featured: true,
    tags: ["Linux", "Command Line", "System Administration", "DevOps"]
  }
]

const categories = [
  "All",
  "System Administration",
  "Web Development",
  "Machine Learning",
  "Cybersecurity",
  "Mobile Development",
  "DevOps",
  "Backend Development",
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  const filteredPosts = blogPosts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((post) => selectedCategory === "All" || post.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
    })

  return (
    <BackgroundWrapper>
      {/* Header */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Developers Blog</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover insights, tutorials, and innovations from our community of tech enthusiasts
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-morphism text-white"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 glass-morphism text-white">
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
              <SelectTrigger className="w-full sm:w-48 glass-morphism text-white">
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

      {/* Blog Posts */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-white/80">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 glass-morphism">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 glass-morphism text-white">{post.category}</Badge>
                    {post.featured && (
                      <Badge variant="secondary" className="absolute top-4 right-4 glass-morphism text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-blue-400 transition-colors text-white">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-white/80">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="font-medium text-white">{post.author.name}</div>
                          <div className="text-white/60">{post.author.role}</div>
                        </div>
                      </div>
                      <div className="text-sm text-white/60 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-white/60">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </BackgroundWrapper>
  )
}
