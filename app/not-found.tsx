import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen hero-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
        <p className="text-white/80 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="button-epic">
          <Link href="/">
            Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  )
} 