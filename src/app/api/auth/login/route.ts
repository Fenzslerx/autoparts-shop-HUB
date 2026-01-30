import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { logAuth } from '@/lib/logger'
import { checkRateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter'

export const dynamic = 'force-dynamic'

// Login - Strict rate limit: 5 attempts per 5 minutes (brute force protection)
export async function POST(request: Request) {
    const ip = getClientIP(request)

    // Very strict rate limiting for login
    const rateLimit = checkRateLimit(`login-${ip}`, {
        windowMs: 5 * 60 * 1000, // 5 minutes
        maxRequests: 5           // Only 5 attempts
    })

    if (!rateLimit.success) {
        // Log failed attempt due to rate limiting
        try {
            await logAuth('login_rate_limited', 'unknown', ip)
        } catch { }
        return rateLimitResponse(rateLimit.resetTime)
    }

    try {
        const { username, password } = await request.json() as any

        // Basic input validation
        if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
            return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 })
        }

        // Limit input length to prevent DoS
        if (username.length > 100 || password.length > 100) {
            return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 })
        }

        // Retrieve admin credentials from environment variables
        const adminUsername = process.env.ADMIN_USERNAME
        const adminPassword = process.env.ADMIN_PASSWORD

        if (username === adminUsername && password === adminPassword) {
            // Set a cookie manually
            const cookieStore = await cookies()
            cookieStore.set('admin_auth', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            })

            // Log successful login
            await logAuth('login', username, ip)

            return NextResponse.json({ success: true })
        }

        // Log failed login attempt
        try {
            await logAuth('login_failed', username, ip)
        } catch { }

        // Add delay to slow down brute force
        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
    }
}
