"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Menu, Search } from "lucide-react"
import Image from "next/image"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

// Client-only authentication component to prevent hydration mismatches
function AuthSection() {
  const { isSignedIn } = useUser()
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  if (!isMounted) {
    return (
      <div className="flex items-center">
        <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  if (isSignedIn) {
    return (
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "w-8 h-8 ring-2 ring-blue-600/20 hover:ring-blue-600 transition-all duration-300",
          },
        }}
      />
    )
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <SignInButton mode="modal">
          <Button variant="ghost" className="button-epic auth-button">
            Login
            <svg 
              className="w-5 h-5 ml-2" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
          </Button>
        </SignInButton>
      </div>
    </div>
  )
}

// Client-only navigation component for signed-in users
function WriteForUsLink() {
  const { isSignedIn } = useUser()
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  if (!isMounted || !isSignedIn) {
    return null
  }

  return (
    <Link
      href="/write-for-us"
      className={cn(
        "nav-link no-underline",
        isActivePath("/write-for-us") && "active"
      )}
    >
      <span>Write for Us</span>
    </Link>
  )
}

// Client-only admin navigation component
function AdminLink() {
  const { user, isSignedIn } = useUser()
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  if (!isMounted || !isSignedIn) {
    return null
  }

  const email = user?.emailAddresses?.[0]?.emailAddress
  if (email !== 'devclub@iiitdm.ac.in') {
    return null
  }

  return (
    <Link
      href="/admin"
      className={cn(
        "nav-link no-underline",
        isActivePath("/admin") && "active"
      )}
    >
      <span>Admin</span>
    </Link>
  )
}

// Client-only mobile navigation component for signed-in users
function WriteForUsMobileLink({ onClose }: { onClose: () => void }) {
  const { isSignedIn } = useUser()
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  if (!isMounted || !isSignedIn) {
    return null
  }

  return (
    <Link
      href="/write-for-us"
      className={cn(
        "mobile-nav-link no-underline",
        isActivePath("/write-for-us") && "active"
      )}
      onClick={onClose}
    >
      <span>Write for Us</span>
    </Link>
  )
}

// Client-only mobile admin navigation component
function AdminMobileLink({ onClose }: { onClose: () => void }) {
  const { user, isSignedIn } = useUser()
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  if (!isMounted || !isSignedIn) {
    return null
  }

  const email = user?.emailAddresses?.[0]?.emailAddress
  if (email !== 'devclub@iiitdm.ac.in') {
    return null
  }

  return (
    <Link
      href="/admin"
      className={cn(
        "mobile-nav-link no-underline",
        isActivePath("/admin") && "active"
      )}
      onClick={onClose}
    >
      <span>Admin</span>
    </Link>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Set initial scroll state
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300",
      isMounted && isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-white"
    )}>
      <style jsx global>{`
        @keyframes textShimmer {
          0% { color: #4f46e5; }
          25% { color: #6366f1; }
          50% { color: #8b5cf6; }
          75% { color: #6366f1; }
          100% { color: #4f46e5; }
        }
        .text-shimmer-hover {
          color: #3b82f6;
          transition: all 0.3s ease;
          position: relative;
        }
        .text-shimmer-hover:hover {
          animation: textShimmer 3s linear infinite;
          text-shadow: 
            0 0 10px rgba(99, 102, 241, 0.3),
            0 0 20px rgba(99, 102, 241, 0.2),
            0 0 30px rgba(99, 102, 241, 0.1);
        }
        .nav-link {
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          color: #64748b;
          text-decoration: none;
        }
        .nav-link span {
          display: inline-block;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .nav-link:hover span {
          transform: scale(1.1);
          color: #4f46e5;
        }
        .nav-link.active {
          color: #4f46e5;
          background: rgba(30, 58, 138, 0.15);
        }
        .nav-link.active span {
          transform: scale(1);
        }
        
        /* Mobile nav specific styles */
        .mobile-nav-link {
          padding: 0.75rem 1rem;
          border-radius: 9999px;
          color: #64748b;
          text-decoration: none;
        }
        .mobile-nav-link span {
          display: inline-block;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .mobile-nav-link:hover span {
          transform: scale(1.1);
          color: #4f46e5;
        }
        .mobile-nav-link.active {
          color: #4f46e5;
          background: rgba(30, 58, 138, 0.15);
        }
        .mobile-nav-link.active span {
          transform: scale(1);
        }

        .button-epic {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        }
        .button-epic:hover {
          transform: translateY(-2px);
        }
        .button-epic::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: 0.5s;
        }
        .button-epic:hover::before {
          left: 100%;
        }

        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5),
                      0 0 10px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.7),
                      0 0 20px rgba(139, 92, 246, 0.5),
                      0 0 30px rgba(139, 92, 246, 0.3);
          }
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5),
                      0 0 10px rgba(139, 92, 246, 0.3);
          }
        }

        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        /* Auth button styles */
        .auth-button {
          font-weight: 500;
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
        }

        /* Remove write-prompt styles */
      `}</style>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
          >
            <div className="relative">
            <Image 
              src="/developers-club-logo.png" 
              alt="Developers Club Logo" 
                width={32} 
                height={32}
                className="transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold text-shimmer-hover">
              Developers Blog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 ml-8">
            {navigation.map((item) => {
              const isActive = isActivePath(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "nav-link no-underline",
                    isActive && "active"
                  )}
                >
                  <span>{item.name}</span>
                </Link>
              )
            })}
            {isMounted && (
              <>
                <WriteForUsLink />
                <AdminLink />
              </>
            )}
          </nav>

          {/* Auth and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Authentication */}
            <AuthSection />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-blue-600/10 transition-colors duration-200"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <nav className="flex flex-col space-y-1">
                    {navigation.map((item) => {
                      const isActive = isActivePath(item.href)
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "mobile-nav-link no-underline",
                            isActive && "active"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                    {isMounted && (
                      <>
                        <AuthSection />
                        <WriteForUsMobileLink onClose={() => setIsOpen(false)} />
                        <AdminMobileLink onClose={() => setIsOpen(false)} />
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
} 