"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, MessageSquare, Users, FileText, Send } from "lucide-react"
import { BackgroundWrapper } from "@/components/background-wrapper"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
    isStudent: false,
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your submission! We'll get back to you soon.")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <BackgroundWrapper>
      {/* Header */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Get in Touch</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have a story to share? Want to join our community? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Options */}
          <div className="space-y-6">
            <Card className="glass-morphism">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-white">Submit an Article</CardTitle>
                </div>
                <CardDescription className="text-white/80">Share your knowledge and insights with our community</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Technical tutorials</li>
                  <li>• Project showcases</li>
                  <li>• Industry insights</li>
                  <li>• Career advice</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-green-400" />
                  <CardTitle className="text-white">Join Our Club</CardTitle>
                </div>
                <CardDescription className="text-white/80">Become part of our tech community</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Weekly meetups</li>
                  <li>• Collaborative projects</li>
                  <li>• Networking events</li>
                  <li>• Skill workshops</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6 text-purple-400" />
                  <CardTitle className="text-white">General Inquiries</CardTitle>
                </div>
                <CardDescription className="text-white/80">Questions, feedback, or collaboration ideas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>techclub@college.edu</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-white">Send us a Message</CardTitle>
                <CardDescription className="text-white/80">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="glass-morphism text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="glass-morphism text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Message subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="glass-morphism text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger className="glass-morphism text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="article">Submit Article</SelectItem>
                        <SelectItem value="join">Join Club</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="min-h-[150px] glass-morphism text-white"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isStudent"
                        checked={formData.isStudent}
                        onCheckedChange={(checked) => handleInputChange("isStudent", checked as boolean)}
                      />
                      <Label htmlFor="isStudent" className="text-white">
                        I am a student
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="terms" className="text-white">
                        I agree to the terms and conditions
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full button-epic">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  )
}
