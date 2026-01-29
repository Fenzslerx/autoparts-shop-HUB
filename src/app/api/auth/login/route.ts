import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { logAuth } from '@/lib/logger'

export const runtime = 'edge'

export async function POST(request: Request) {
    const { username, password } = await request.json()

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
        const ip = request.headers.get('x-forwarded-for') || 'unknown'
        await logAuth('login', username, ip)

        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
}
