import { NextRequest, NextResponse } from 'next/server'
import { isValidLocale, DEFAULT_LOCALE } from './src/lib/i18n'

/**
 * Rate limiting middleware for protecting against abuse
 * Uses in-memory store (simple approach for small projects)
 * In production, use Redis for distributed rate limiting
 */

const REQUEST_LIMIT = 5 // max requests
const WINDOW_MS = 60 * 1000 // per 1 minute

// Simple in-memory store: { ip: { count, resetTime } }
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function middleware(request: NextRequest) {
  // Skip static files and Next.js assets
  const pathname = request.nextUrl.pathname
  
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // static files (css, js, png, etc)
  ) {
    return NextResponse.next()
  }

  // Handle locale routing: redirect to /pl if no locale prefix
  const segments = pathname.split('/').filter(Boolean)
  const potentialLocale = segments[0]

  // If root path or no valid locale prefix, redirect to default locale
  if (pathname === '/' || (segments.length > 0 && !isValidLocale(potentialLocale))) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url))
  }

  // Only rate limit API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()

  // Get or create rate limit entry
  let limiter = rateLimitStore.get(ip)

  if (!limiter || now > limiter.resetTime) {
    // Reset counter
    limiter = { count: 1, resetTime: now + WINDOW_MS }
    rateLimitStore.set(ip, limiter)
    return NextResponse.next()
  }

  limiter.count++

  if (limiter.count > REQUEST_LIMIT) {
    return NextResponse.json(
      {
        error: 'Za wiele zapytań. Spróbuj ponownie za kilka minut.',
        message: 'Too Many Requests',
      },
      { status: 429 }
    )
  }

  return NextResponse.next()
}

export const config = {
  // Apply middleware to API routes only
  matcher: ['/api/:path*'],
}
