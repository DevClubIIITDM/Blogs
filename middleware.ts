import { clerkMiddleware } from '@clerk/nextjs/server';

// Handle missing Clerk keys gracefully in development
export default clerkMiddleware((auth, req) => {
  // Skip authentication for development when keys are missing
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return;
  }
  // Normal clerk middleware behavior when keys are present
});

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and login routes
    '/((?!_next|login|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}; 