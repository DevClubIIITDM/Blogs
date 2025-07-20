"use client"

import { ScrollReveal } from "@/components/scroll-reveal"

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <div className="min-h-screen hero-background relative">
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ScrollReveal>
  )
} 