import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { logAuth } from '@/lib/logger'

export const runtime = 'edge'

export async function POST(request: Request) {
    const { username, password } = await request.json()

    // Get credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'mavarix123'

    if (username === adminUsername && password === adminPassword) {
        // Set a simple auth cookie
        const cookieStore = await cookies()
        cookieStore.set('admin_auth', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        })

        // Validated
        await logAuth('login', username, request.headers.get('x-forwarded-for') || undefined)

        return NextResponse.json({ success: true })
    }

    return NextResponse.json(
        { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
    )
}

export const runtime = 'edge'
