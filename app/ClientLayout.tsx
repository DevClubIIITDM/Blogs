"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { useState, useEffect } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isClerkConfigured, setIsClerkConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if Clerk is properly configured - check for both existence and non-empty value
    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const isConfigured = Boolean(clerkKey && 
                        clerkKey.trim() !== '' &&
                        clerkKey !== 'your_publishable_key_here')
    
    setIsClerkConfigured(isConfigured)
    setIsLoading(false)
  }, [])

  // Show loading state while checking
  if (isLoading) {
    return <>{children}</>
  }

  // If Clerk is not configured, render children without ClerkProvider
  if (!isClerkConfigured) {
    return <>{children}</>
  }

  // If Clerk is configured, render with ClerkProvider
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          card: "bg-white shadow-lg rounded-lg",
          headerTitle: "text-gray-900 font-semibold",
          headerSubtitle: "text-gray-600",
          socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
          formFieldLabel: "text-gray-700 font-medium",
          formFieldInput: "border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          footerActionLink: "text-blue-600 hover:text-blue-700",
        },
        variables: {
          colorPrimary: "#2563eb",
          colorBackground: "#ffffff",
          colorText: "#1f2937",
        },
      }}
      signInUrl="/login"
      signUpUrl="/login"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      {children}
    </ClerkProvider>
  )
} 