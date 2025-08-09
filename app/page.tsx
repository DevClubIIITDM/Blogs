"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Calendar, TrendingUp, Users, Code, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import "@/styles/animations.css"
import { ScrollReveal } from "@/components/scroll-reveal"


const stats = [
  { icon: Users, label: "Active Members", value: "150+" },
  { icon: Code, label: "Projects Completed", value: "50+" },
  { icon: TrendingUp, label: "Blog Posts", value: "200+" },
  { icon: Zap, label: "Tech Events", value: "25+" },
]

export default function HomePage() {
  return (
    <ScrollReveal>
      <div className="min-h-screen hero-background relative">

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 z-10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 section-animate">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit glass-morphism text-white">
                    Developers Blog
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white">
                    Innovate. Learn. <span className="text-shimmer">Create.</span>
                  </h1>
                  <p className="text-xl text-white/80 max-w-lg">
                    Join our community of developers and tech enthusiasts from IIITDM Kancheepuram. Share knowledge, build
                    projects, and explore the latest in technology.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 button-epic">
                    <Link href="/blog">
                      Explore Blog Posts <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  {/* <Button asChild size="lg" variant="outline" className="text-lg px-8 button-epic-outline">
                    <Link href="/write-for-us">
                      Write for Us <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button> */}
                </div>
              </div>
              <div className="relative float-element">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl"></div>
                <Image
                  src="/hero-image.jpg"
                  alt="Tech innovation illustration"
                  width={600}
                  height={500}
                  className="relative rounded-2xl shadow-2xl glass-morphism"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="interactive-card glass-morphism p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="mx-auto w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white text-shimmer">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
                </div>

              ))}
            </div>
          </div>
        </section> */}

        {/* About the Club Section */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center space-y-4 mb-10 glass-morphism p-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">About the Club</h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/80">
                The Developers Club of IIITDM Kancheepuram bridges the gap between academic learning and practical skills by providing exposure to cutting-edge technologies.
                Our mission is to foster innovation, peer learning, and continuous skill development through hackathons, hands-on workshops, and collaborative projects.
                By nurturing a sustainable and inclusive environment, we empower students to stay updated with industry trends and tackle real-world tech challenges.
              </p>
            </div>
          </div>
        </section>

        {/* About the Website Section */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-8 glass-morphism p-8 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">About the Website</h2>
              <p className="text-xl text-white/80">
                This website is the official blog platform of the Developers Club at IIITDM Kancheepuram.
                Here, you can explore technical articles and connect with fellow developers.
                Built using modern web technologies, our platform reflects our commitment to openness, speed, and community-led learning.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section (final) */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-5xl mx-auto space-y-8 glass-morphism p-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to share your tech journey?</h2>
              <p className="text-xl text-white/80">
                Become a part of our collaborative writing community and share your insights with tech enthusiasts across campus.
                Whether you're just starting out or already experienced, your voice can inspire others.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 button-epic">
                  <Link href="/write-for-us">Submit Your Article</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 button-epic"
                >
                  <Link href="https://devclub.iiitdm.ac.in" target="_blank" rel="noopener noreferrer">
                    Visit Club Website
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


      </div>
    </ScrollReveal>
  )
}
