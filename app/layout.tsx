import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import '@/styles/animations.css'
import { Navbar } from '@/components/navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Developers Blog',
  description: 'A community-driven blog for tech enthusiasts, developers, and innovators. Share knowledge, insights, and connect with fellow developers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en dark">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
          <Navbar />
          {children}
      </body>
    </html>
  )
}
