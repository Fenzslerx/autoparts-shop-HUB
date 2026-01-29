import { NextRequest, NextResponse } from 'next/server'
import { getLogs, getLogStats, LogType } from '@/lib/logger'
import { cookies } from 'next/headers'

async function checkAuth() {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('admin_auth')
    return authCookie?.value === 'authenticated'
}

export async function GET(request: NextRequest) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as LogType | null
    const limit = searchParams.get('limit')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const statsOnly = searchParams.get('stats') === 'true'

    if (statsOnly) {
        const stats = await getLogStats()
        return NextResponse.json({ stats })
    }

    const logs = await getLogs({
        type: type || undefined,
        limit: limit ? parseInt(limit) : 100,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
    })

    return NextResponse.json({ logs })
}
