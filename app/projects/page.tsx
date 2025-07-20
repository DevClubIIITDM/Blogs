"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, ExternalLink, Code, Users, Calendar, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import "@/styles/animations.css"

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, TypeScript, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "Prisma"],
    githubUrl: "https://github.com/developersclub/ecommerce-platform",
    liveUrl: "https://ecommerce-platform.vercel.app",
    contributors: 8,
    stars: 45,
    lastUpdated: "2024-01-15",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development"
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    description: "An intelligent chat assistant powered by OpenAI's GPT model. Built with React and Node.js, featuring real-time messaging, conversation history, and customizable responses.",
    technologies: ["React", "Node.js", "OpenAI API", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com/developersclub/ai-chat-assistant",
    liveUrl: "https://ai-chat-assistant.vercel.app",
    contributors: 5,
    stars: 32,
    lastUpdated: "2024-01-10",
    image: "/placeholder.svg?height=200&width=400",
    category: "AI/ML"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration, and progress tracking. Built with React, Firebase, and Material-UI.",
    technologies: ["React", "Firebase", "Material-UI", "Redux", "TypeScript"],
    githubUrl: "https://github.com/developersclub/task-management-app",
    liveUrl: "https://task-management-app.vercel.app",
    contributors: 12,
    stars: 67,
    lastUpdated: "2024-01-08",
    image: "/placeholder.svg?height=200&width=400",
    category: "Productivity"
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard with real-time weather data, 7-day forecasts, and location-based services. Features interactive maps and weather alerts.",
    technologies: ["Vue.js", "OpenWeather API", "Leaflet", "Chart.js", "Vuetify"],
    githubUrl: "https://github.com/developersclub/weather-dashboard",
    liveUrl: "https://weather-dashboard.vercel.app",
    contributors: 6,
    stars: 28,
    lastUpdated: "2024-01-05",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development"
  },
  {
    id: 5,
    title: "Mobile Fitness Tracker",
    description: "A React Native mobile app for tracking fitness activities, workouts, and health metrics. Includes GPS tracking, workout plans, and progress visualization.",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "Native Base"],
    githubUrl: "https://github.com/developersclub/fitness-tracker",
    liveUrl: null,
    contributors: 9,
    stars: 41,
    lastUpdated: "2024-01-03",
    image: "/placeholder.svg?height=200&width=400",
    category: "Mobile Development"
  },
  {
    id: 6,
    title: "Blockchain Voting System",
    description: "A decentralized voting system built on Ethereum blockchain. Ensures transparency, security, and immutability of voting records with smart contracts.",
    technologies: ["Solidity", "React", "Web3.js", "Hardhat", "MetaMask"],
    githubUrl: "https://github.com/developersclub/blockchain-voting",
    liveUrl: "https://blockchain-voting.vercel.app",
    contributors: 7,
    stars: 53,
    lastUpdated: "2024-01-01",
    image: "/placeholder.svg?height=200&width=400",
    category: "Blockchain"
  }
]

const categories = ["All", "Web Development", "AI/ML", "Mobile Development", "Blockchain", "Productivity"]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen hero-background relative">

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 z-10">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit glass-morphism text-white">
                Our Projects
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white">
                Explore Our <span className="text-shimmer">Projects</span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Discover the innovative projects created by our talented community of developers. 
                From web applications to mobile apps, AI solutions to blockchain systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="glass-morphism border-white/20 text-white hover:bg-white/10"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="glass-morphism border-white/10 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600/80 text-white">
                    {project.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-white text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-white/70">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-white/10 text-white/80">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.contributors}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{project.stars}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1 button-epic">
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </Link>
                    </Button>
                                         {project.liveUrl && (
                       <Button asChild size="sm" className="button-epic">
                         <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                           <ExternalLink className="h-4 w-4 mr-2" />
                           Live Demo
                         </Link>
                       </Button>
                     )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 glass-morphism p-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Want to Contribute?</h2>
            <p className="text-xl text-white/80">
              Join our community and contribute to exciting projects. Whether you're a beginner or an expert, 
              there's always room for collaboration and learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 button-epic">
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
                              <Button asChild size="lg" className="text-lg px-8 button-epic">
                  <Link href="/blog">
                    Read Our Blog
                  </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 