import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Check if user is authenticated
export async function GET() {
    try {
        const cookieStore = await cookies()
        const authCookie = cookieStore.get('admin_auth')
        const isAuthenticated = authCookie?.value === 'true'

        return NextResponse.json({
            authenticated: isAuthenticated
        })
    } catch (error) {
        return NextResponse.json({ authenticated: false })
    }
}
