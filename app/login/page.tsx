"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// TODO: Add Supabase imports and logic here

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState(null)

  // TODO: Add Supabase auth state logic here

  const handleGoogleSignIn = async () => {
    // TODO: Implement Supabase Google sign-in
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement Supabase email/password sign-in and sign-up
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4">
              <Image
                src="/developers-club-logo.png"
                alt="Developers Club"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Welcome Back" : "Join Our Community"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Sign in to access your account and start writing" 
                : "Create an account to contribute to our tech community"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              variant="outline"
            >
              <Image
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="text-center text-sm">
              {isLogin ? (
                <p>
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign up
                  </Button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold"
                    onClick={() => setIsLogin(true)}
                  >
                    Sign in
                  </Button>
                </p>
              )}
            </div>

            {/* Features */}
            <div className="pt-6 border-t">
              <h4 className="text-sm font-semibold mb-3 text-center">Why join us?</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Badge variant="secondary" className="mr-2 text-xs">✓</Badge>
                  Write and publish tech articles
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Badge variant="secondary" className="mr-2 text-xs">✓</Badge>
                  Connect with fellow developers
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Badge variant="secondary" className="mr-2 text-xs">✓</Badge>
                  Build your tech portfolio
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 