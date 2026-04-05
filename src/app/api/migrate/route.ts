import { NextResponse } from 'next/server'
import { executeD1Query } from '@/lib/cloudflare-db'
import { isD1Configured } from '@/lib/env'

export const dynamic = 'force-dynamic'

const statements = [
    `CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        car_brand TEXT NOT NULL,
        car_model TEXT NOT NULL,
        car_year TEXT,
        category TEXT NOT NULL,
        image_url TEXT,
        images TEXT,
        stock INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        is_deleted INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS logs (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        action TEXT NOT NULL,
        data TEXT,
        ip TEXT,
        user_agent TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    )`,
    'CREATE INDEX IF NOT EXISTS idx_products_active_deleted ON products (is_active, is_deleted)',
    'CREATE INDEX IF NOT EXISTS idx_products_updated_at ON products (updated_at)',
]

const fallbackAlterStatements = [
    'ALTER TABLE products ADD COLUMN images TEXT',
    'ALTER TABLE products ADD COLUMN is_deleted INTEGER DEFAULT 0',
]

export async function GET() {
    try {
        if (!isD1Configured()) {
            return NextResponse.json({
                success: true,
                message: 'Local mode active. No D1 migration required.',
            })
        }

        const executed: string[] = []

        for (const sql of statements) {
            await executeD1Query(sql)
            executed.push(sql.split('(')[0].trim())
        }

        for (const sql of fallbackAlterStatements) {
            try {
                await executeD1Query(sql)
                executed.push(sql)
            } catch {
                // Column may already exist; ignore and continue.
            }
        }

        return NextResponse.json({
            success: true,
            message: 'D1 migration completed',
            executed,
        })
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}
