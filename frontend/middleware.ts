import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of routes that are no longer available
const disabledRoutes = [
  '/login',
  '/properties',
  '/analytics',
  '/wallet',
  '/tools',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the requested path is in the disabled routes list
  if (disabledRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )) {
    // Redirect to the home page
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure matcher for all relevant paths that need middleware
export const config = {
  matcher: [
    '/login/:path*',
    '/properties/:path*',
    '/analytics/:path*',
    '/wallet/:path*',
    '/tools/:path*',
    '/login',
    '/properties',
    '/analytics',
    '/wallet',
    '/tools',
  ],
} 