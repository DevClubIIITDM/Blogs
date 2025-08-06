"use client"

import { SignIn } from "@clerk/nextjs"

export default function LoginPage() {
  return (
    <div className="min-h-screen hero-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Developers Club
          </h1>
          <p className="text-white/80">
            Sign in with your IIITDM email address
          </p>
          <div className="mt-4 p-4 glass-morphism">
            <p className="text-sm text-white/90">
              <strong>Note:</strong> Only @iiitdm.ac.in email addresses are allowed for authentication.
            </p>
          </div>
        </div>

        <div className="glass-morphism p-6">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "bg-gradient-to-r from-[#5c42ff] to-[#12d8fa] hover:brightness-110 text-white w-full rounded-full font-bold",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white font-semibold text-xl",
                headerSubtitle: "text-white/80",
                formFieldLabel: "text-white font-medium",
                formFieldInput: "bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40 rounded-md",
                footerActionLink: "text-[#12d8fa] hover:text-[#5c42ff]",
                formFieldErrorText: "text-red-400 text-sm",
              },
              variables: {
                colorPrimary: "#5c42ff",
                colorBackground: "transparent",
                colorText: "#f1f5fa",
              },
            }}
            routing="path"
            path="/login"
            fallbackRedirectUrl="/"
            forceRedirectUrl="/"
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-white/60">
            Having trouble? Contact your administrator
          </p>
        </div>
      </div>
    </div>
  )
}