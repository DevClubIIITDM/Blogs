"use client"

import { useState, useEffect } from "react"
import { useSignIn } from "@clerk/nextjs"

export function EmailDomainValidator() {
  const { signIn, isLoaded } = useSignIn()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoaded) return

    // Listen for email input changes
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
    if (emailInput) {
      const handleEmailChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        const emailValue = target.value
        setEmail(emailValue)
        
        if (emailValue && !emailValue.endsWith('@iiitdm.ac.in')) {
          setError("Only @iiitdm.ac.in email addresses are allowed")
          // Disable the sign-in button
          const signInButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
          if (signInButton) {
            signInButton.disabled = true
            signInButton.style.opacity = '0.5'
            signInButton.style.cursor = 'not-allowed'
          }
        } else {
          setError("")
          // Re-enable the sign-in button
          const signInButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
          if (signInButton) {
            signInButton.disabled = false
            signInButton.style.opacity = '1'
            signInButton.style.cursor = 'pointer'
          }
        }
      }

      emailInput.addEventListener('input', handleEmailChange)
      return () => emailInput.removeEventListener('input', handleEmailChange)
    }
  }, [isLoaded])

  // Override the sign-in process
  useEffect(() => {
    if (!isLoaded || !signIn) return

    const originalSignIn = signIn.create
    signIn.create = async (strategy, options) => {
      // Check email domain before proceeding
      if (email && !email.endsWith('@iiitdm.ac.in')) {
        throw new Error("Only @iiitdm.ac.in email addresses are allowed")
      }
      
      return originalSignIn.call(signIn, strategy, options)
    }
  }, [isLoaded, signIn, email])

  return null // This component doesn't render anything visible
} 