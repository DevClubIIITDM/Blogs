"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Blog posts data - same as in [slug]/page.tsx
const blogPosts = [
  {
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and build your first component",
    author: {
      name: "Developers Club Team",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Full Stack Developer",
    },
    category: "Web Development",
    date: "2025-01-15",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    slug: "ai-in-healthcare",
    title: "AI in Healthcare: Opportunities & Challenges",
    excerpt: "Exploring the impact of artificial intelligence on healthcare",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "AI/ML Engineer",
    },
    category: "Machine Learning",
    date: "2025-01-10",
    readTime: "12 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    tags: ["AI", "Healthcare", "Machine Learning"]
  },
  {
    slug: "cybersecurity-best-practices",
    title: "Cybersecurity Best Practices for Modern Applications",
    excerpt: "Learn essential security practices to protect your applications from common vulnerabilities and cyber threats.",
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Security Specialist",
    },
    category: "Cybersecurity",
    date: "2025-01-08",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    tags: ["Security", "Cybersecurity", "Best Practices"]
  },
  {
    slug: "react-native-vs-flutter",
    title: "React Native vs Flutter: A Comprehensive Comparison",
    excerpt: "Compare the two leading cross-platform mobile development frameworks and choose the right one for your next project.",
    author: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Mobile Developer",
    },
    category: "Mobile Development",
    date: "2025-01-05",
    readTime: "15 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    tags: ["React Native", "Flutter", "Mobile Development"]
  },
  {
    slug: "docker-for-development",
    title: "Getting Started with Docker for Development",
    excerpt: "Learn how to containerize your applications and streamline your development workflow with Docker.",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "DevOps Engineer",
    },
    category: "DevOps",
    date: "2025-01-03",
    readTime: "11 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    tags: ["Docker", "DevOps", "Containerization"]
  },
  {
    slug: "restful-apis-nodejs",
    title: "Building RESTful APIs with Node.js and Express",
    excerpt: "Master the fundamentals of API development with Node.js and Express, including authentication and best practices.",
    author: {
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Backend Developer",
    },
    category: "Backend Development",
    date: "2025-01-01",
    readTime: "9 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    tags: ["Node.js", "Express", "API Development"]
  },
]

const categories = [
  "All",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Developers Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover insights, tutorials, and innovations from our community of tech enthusiasts
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
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
              <SelectTrigger className="w-full sm:w-48">
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 bg-white">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">{post.category}</Badge>
                    {post.featured && (
                      <Badge variant="secondary" className="absolute top-4 right-4">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="font-medium">{post.author.name}</div>
                          <div className="text-muted-foreground">{post.author.role}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
