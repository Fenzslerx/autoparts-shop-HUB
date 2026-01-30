import { executeD1Query } from '@/lib/cloudflare-db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        // Add images column if it doesn't exist
        // Note: multiple statements might not be supported in one go depending on the driver, 
        // but simple ALTER usually works. We'll wrap in try/catch.

        await executeD1Query('ALTER TABLE products ADD COLUMN images TEXT;')

        return NextResponse.json({ success: true, message: 'Migration executed: Added images column' })
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}
