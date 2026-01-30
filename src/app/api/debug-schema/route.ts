import { executeD1Query } from '@/lib/cloudflare-db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const result = await executeD1Query('PRAGMA table_info(products)')
        return NextResponse.json({ result })
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}
