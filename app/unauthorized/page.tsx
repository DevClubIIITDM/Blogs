"use client"

import { useUser, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-red-600" 
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Access Restricted
          </h1>
          <p className="text-gray-600 mb-4">
            This platform is only available to IIITDM students and staff.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Current Email:</strong> {user?.emailAddresses?.[0]?.emailAddress || 'Unknown'}
            </p>
            <p className="text-sm text-red-800 mt-2">
              Only @iiitdm.ac.in email addresses are allowed to access this platform.
            </p>
          </div>

          <div className="space-y-3">
            <SignOutButton>
              <Button variant="outline" className="w-full">
                Sign Out
              </Button>
            </SignOutButton>
            
            <Button asChild className="w-full">
              <Link href="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact your administrator
          </p>
        </div>
      </div>
    </div>
  )
} 