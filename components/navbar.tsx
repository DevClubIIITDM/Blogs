"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { User } from "@/lib/server/user"

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

function isActivePath(pathname: string, path: string) {
  return path === "/" ? pathname === path : pathname.startsWith(path)
}

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/get-user")
        const data = await res.json()
        if (res.ok) setUser(data)
        else setUser(null)
      } catch {
        setUser(null)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "backdrop-blur-md shadow-lg" : ""
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <div className="relative">
              <Image
                src="/developers-club-logo.png"
                alt="Logo"
                width={32}
                height={32}
              />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-shimmer-hover">
              Developers Blog
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "nav-link no-underline",
                  isActivePath(pathname, item.href) && "active"
                )}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Desktop Auth */}
            <div className="hidden md:flex">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.picture} />
                      <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                {user?.role === "A" && (
                  <DropdownMenuItem asChild>
                  <Link href="/admin">
                  Admin
                  </Link>
                  </DropdownMenuItem>
                  )}

                    <DropdownMenuItem asChild>
                      <Link href="/write-for-us">Write for Us</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <form action="/logout" method="GET">
                        <button type="submit" className="w-full text-left">
                          Logout
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login/google">
                  <Button>Login</Button>
                </Link>
              )}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {user ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.picture || ""} />
                      <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {navigation.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href}>{item.name}</Link>
                    </DropdownMenuItem>
                  ))}

                  {user ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/write-for-us">Write for Us</Link>
                      </DropdownMenuItem>
                      {user.role === "A" && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin">Admin</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <form action="/logout" method="GET">
                          <button type="submit" className="w-full text-left">
                            Logout
                          </button>
                        </form>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/login/google">Login</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
