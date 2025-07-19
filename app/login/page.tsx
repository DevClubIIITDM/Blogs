"use client"

import { SignIn } from "@clerk/nextjs"
import { useState } from "react"
import { EmailDomainValidator } from "@/components/email-domain-validator"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase()
    if (domain !== 'iiitdm.ac.in') {
      setError("Only @iiitdm.ac.in email addresses are allowed")
      return false
    }
    setError("")
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <EmailDomainValidator />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Developers Club
          </h1>
          <p className="text-gray-600">
            Sign in with your IIITDM email address
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Only @iiitdm.ac.in email addresses are allowed for authentication.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white w-full",
                card: "bg-transparent shadow-none",
                headerTitle: "text-gray-900 font-semibold text-xl",
                headerSubtitle: "text-gray-600",
                formFieldLabel: "text-gray-700 font-medium",
                formFieldInput: "border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                footerActionLink: "text-blue-600 hover:text-blue-700",
                formFieldErrorText: "text-red-600 text-sm",
              },
              variables: {
                colorPrimary: "#2563eb",
                colorBackground: "#ffffff",
                colorText: "#1f2937",
              },
            }}
            signUpUrl="/login"
            afterSignInUrl="/"
            afterSignUpUrl="/"
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Having trouble? Contact your administrator
          </p>
        </div>
      </div>
    </div>
  )
} 