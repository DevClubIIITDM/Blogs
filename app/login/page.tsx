"use client"

import { SignIn } from "@clerk/nextjs"
import { BackgroundWrapper } from "@/components/background-wrapper"

export default function LoginPage() {
  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-morphism p-8 rounded-lg shadow-xl">
          <SignIn 
            path="/login" 
            routing="path"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white",
                headerSubtitle: "text-white/80",
                socialButtonsBlockButton: "button-epic",
                dividerRow: "hidden",
                dividerText: "hidden",
                formFieldRow: "hidden",
                formFieldInput: "hidden",
                formFieldLabel: "hidden",
                formButtonPrimary: "hidden",
                footerActionText: "hidden",
                footerActionLink: "hidden",
                alternativeMethodsBlockButton: "hidden",
                identityPreviewText: "hidden",
                identityPreviewEditButton: "hidden",
                formFieldInputShowPasswordButton: "hidden",
                otpCodeFieldInputs: "hidden",
                formFieldSuccessText: "hidden",
                formFieldErrorText: "hidden",
                alertText: "hidden",
                alertTextSignInFactor: "hidden",
                main: "w-full",
                form: "hidden"
              },
            }}
            afterSignInUrl="/"
          />
        </div>
      </div>
    </BackgroundWrapper>
  )
} 