"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useIIITDMValidation() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isValid, setIsValid] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
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