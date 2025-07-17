import Link from "next/link"
import { Code2, Github, Twitter, Linkedin, Mail, Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/developers-club-logo.png" alt="Developers Club Logo" width={32} height={32} />
              <span className="text-xl font-bold">Developers Club</span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Empowering the next generation of tech innovators through knowledge sharing and community building.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/DevClubIIITDM" className="text-gray-400 hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/dev.club.iiitdm/" className="text-gray-400 hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/developersclub-iiitdm-kancheepuram/posts/?feedView=all" className="text-gray-400 hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog?category=web-development"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?category=machine-learning"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/blog?category=cybersecurity" className="text-gray-400 hover:text-white transition-colors">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="/blog?category=mobile-dev" className="text-gray-400 hover:text-white transition-colors">
                  Mobile Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Write for Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Style Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Developers Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
