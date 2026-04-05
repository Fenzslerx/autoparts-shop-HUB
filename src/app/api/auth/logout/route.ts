import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { logAuth } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const cookieStore = await cookies()
    cookieStore.delete('admin_auth')

    // Log logout (optional, can pass 'admin' as username since they were logged in)
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    await logAuth('logout', 'admin', ip)

    return NextResponse.json({ success: true })
}
