"use client"

import { SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function UnauthorizedPage() {
  const [isClerkConfigured, setIsClerkConfigured] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if Clerk is configured
    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const isConfigured = Boolean(clerkKey && 
                        clerkKey.trim() !== '' &&
                        clerkKey !== 'your_publishable_key_here')
    
    setIsClerkConfigured(isConfigured)
    
    if (isConfigured) {
      // Dynamically import Clerk hooks only if configured
      import("@clerk/nextjs").then(({ useUser }) => {
        try {
          const { user: clerkUser } = useUser()
          setUser(clerkUser)
        } catch (error) {
          console.log('Clerk not available:', error)
        } finally {
          setIsLoading(false)
        }
      }).catch(() => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen hero-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-red-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Access Restricted
          </h1>
          <p className="text-white/80 mb-4">
            This platform is only available to IIITDM students and staff.
          </p>
        </div>

        <div className="glass-morphism p-6 space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
            <p className="text-sm text-red-300">
              <strong>Current Email:</strong> {user?.emailAddresses?.[0]?.emailAddress || 'Unknown'}
            </p>
            <p className="text-sm text-red-300 mt-2">
              Only @iiitdm.ac.in email addresses are allowed to access this platform.
            </p>
          </div>

          <div className="space-y-3">
            {isClerkConfigured && !isLoading && (
              <SignOutButton>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Sign Out
                </Button>
              </SignOutButton>
            )}
            
            <Button asChild className="w-full button-epic">
              <Link href="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-white/60">
            If you believe this is an error, please contact your administrator
          </p>
        </div>
      </div>
    </div>
  )
} 