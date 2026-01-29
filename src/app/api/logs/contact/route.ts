import { NextRequest, NextResponse } from 'next/server'
import { logContact } from '@/lib/logger'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    try {
        const { productId, productName } = await request.json()

        await logContact(
            productId,
            productName,
            {
                ip: request.headers.get('x-forwarded-for') || undefined,
                userAgent: request.headers.get('user-agent') || undefined
            }
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to log' }, { status: 500 })
    }
}

export const runtime = 'edge'
