'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/achievements", label: "Achievements" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/open-source", label: "Open-Source" },
  { href: "/contact", label: "Contact" }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-morphism backdrop-blur-xl py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 logo-shine">
            <Image 
              src="/developers-club-logo.png" 
              alt="Developers Club Logo" 
              width={40} 
              height={40}
              className="hover:scale-110 transition-transform"
            />
            <span className={`text-xl font-bold ${
              isScrolled ? 'text-white' : 'text-white text-shimmer'
            }`}>
              Developers Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-white/90 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://developersclubiiitdm.vercel.app/home"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-button ml-4 px-6 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Join Club
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-morphism rounded-lg p-4 slide-in-from-top">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://developersclubiiitdm.vercel.app/home"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-button px-4 py-2 rounded-lg text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Club
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 