import { NextResponse } from 'next/server'
import { getLogs, getLogStats, LogType } from '@/lib/logger'

export const runtime = 'edge'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type') as LogType | undefined
        const limit = parseInt(searchParams.get('limit') || '50')

        const logs = await getLogs({ type, limit })

        return NextResponse.json(logs)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 })
    }
}
