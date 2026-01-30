// Simple in-memory rate limiter for API routes
// For production, consider using Vercel Edge Config or Redis

interface RateLimitEntry {
    count: number
    resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries periodically
setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitStore.entries()) {
        if (entry.resetTime < now) {
            rateLimitStore.delete(key)
        }
    }
}, 60000) // Clean every minute

export interface RateLimitConfig {
    windowMs: number      // Time window in milliseconds
    maxRequests: number   // Max requests per window
}

export interface RateLimitResult {
    success: boolean
    remaining: number
    resetTime: number
}

export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = { windowMs: 60000, maxRequests: 30 }
): RateLimitResult {
    const now = Date.now()
    const key = identifier

    const existing = rateLimitStore.get(key)

    // If no existing entry or window has expired
    if (!existing || existing.resetTime < now) {
        rateLimitStore.set(key, {
            count: 1,
            resetTime: now + config.windowMs
        })
        return {
            success: true,
            remaining: config.maxRequests - 1,
            resetTime: now + config.windowMs
        }
    }

    // Increment count
    existing.count++

    // Check if over limit
    if (existing.count > config.maxRequests) {
        return {
            success: false,
            remaining: 0,
            resetTime: existing.resetTime
        }
    }

    return {
        success: true,
        remaining: config.maxRequests - existing.count,
        resetTime: existing.resetTime
    }
}

// Get IP from request headers (works with Vercel)
export function getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) {
        return forwarded.split(',')[0].trim()
    }

    const realIP = request.headers.get('x-real-ip')
    if (realIP) {
        return realIP
    }

    return 'unknown'
}

// Create rate limit response
export function rateLimitResponse(resetTime: number): Response {
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)
    return new Response(
        JSON.stringify({
            error: 'Too many requests. Please try again later.',
            retryAfter
        }),
        {
            status: 429,
            headers: {
                'Content-Type': 'application/json',
                'Retry-After': retryAfter.toString(),
                'X-RateLimit-Remaining': '0',
            }
        }
    )
}
