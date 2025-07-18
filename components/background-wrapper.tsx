"use client"

import { useEffect, useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"

interface StarParticle {
  id: number;
  left: number;
  top: number;
  delay: number;
}

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const [stars, setStars] = useState<StarParticle[]>([]);
  const [particles, setParticles] = useState<StarParticle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4
    }));
    setStars(newStars);

    // Generate particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <ScrollReveal>
      <div className="min-h-screen hero-background relative">
        {/* Background layers */}
        <div className="nebula"></div>
        {isClient && (
          <>
            <div className="star-field">
              {stars.map((star) => (
                <div
                  key={star.id}
                  className="star"
                  style={{
                    left: `${star.left}%`,
                    top: `${star.top}%`,
                    animationDelay: `${star.delay}s`
                  }}
                />
              ))}
            </div>
            <div className="cosmic-dust"></div>

            {/* Light beams */}
            <div className="light-beam"></div>
            <div className="light-beam"></div>
            <div className="light-beam"></div>
            <div className="light-beam"></div>
            <div className="light-beam"></div>

            {/* Animated particles */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animation: `float ${6 + particle.delay}s ease-in-out infinite`,
                  animationDelay: `${particle.delay}s`
                }}
              />
            ))}
          </>
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ScrollReveal>
  )
} 