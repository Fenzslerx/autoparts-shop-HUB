import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { logAuth } from '@/lib/logger'

export async function POST() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_auth')

    // Log logout
    await logAuth('logout', 'admin')

    return NextResponse.json({ success: true })
}
