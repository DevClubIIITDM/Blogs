"use client"

import { ClerkProvider } from "@clerk/nextjs"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
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