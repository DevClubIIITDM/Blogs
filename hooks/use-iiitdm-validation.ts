"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Check if Clerk is configured
const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export function useIIITDMValidation() {
  // Only use Clerk hooks if Clerk is configured
  const { user, isLoaded } = isClerkConfigured ? useUser() : { user: null, isLoaded: true }
  const router = useRouter()
  const [isValid, setIsValid] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // If Clerk is not configured, return early with invalid state
    if (!isClerkConfigured) {
      setIsValid(false)
      setIsChecking(false)
      return
    }

    if (!isLoaded) return

    if (!user) {
      router.push('/login')
      return
    }

    const email = user.emailAddresses?.[0]?.emailAddress
    if (!email) {
      router.push('/unauthorized')
      return
    }

    const domain = email.split('@')[1]?.toLowerCase()
    if (domain !== 'iiitdm.ac.in') {
      router.push('/unauthorized')
      return
    }

    setIsValid(true)
    setIsChecking(false)
  }, [user, isLoaded, router])

  return { isValid, isChecking, user }
} 