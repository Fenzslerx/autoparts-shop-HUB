import { NextResponse } from 'next/server'
import { executeD1Query } from '@/lib/cloudflare-db'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        // Visitor stats - last 7 days
        const visitorStats = await executeD1Query(`
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as count
            FROM visitor_logs 
            WHERE created_at >= datetime('now', '-7 days')
            GROUP BY DATE(created_at)
            ORDER BY date DESC
        `)

        // Total visitors
        const totalVisitors = await executeD1Query(`
            SELECT COUNT(*) as total FROM visitor_logs
        `)

        // Today's visitors
        const todayVisitors = await executeD1Query(`
            SELECT COUNT(*) as total FROM visitor_logs 
            WHERE DATE(created_at) = DATE('now')
        `)

        // Contact logs count
        const contactLogs = await executeD1Query(`
            SELECT COUNT(*) as total FROM contact_logs
        `)

        // Product stats
        const productStats = await executeD1Query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) as outOfStock,
                SUM(CASE WHEN stock > 0 AND stock <= 3 THEN 1 ELSE 0 END) as lowStock
            FROM products WHERE is_active = 1
        `)

        // Most viewed products (from visitor logs)
        const popularProducts = await executeD1Query(`
            SELECT 
                product_id,
                COUNT(*) as views
            FROM visitor_logs 
            WHERE product_id IS NOT NULL
            GROUP BY product_id
            ORDER BY views DESC
            LIMIT 5
        `)

        // Category breakdown
        const categoryStats = await executeD1Query(`
            SELECT 
                category,
                COUNT(*) as count
            FROM products 
            WHERE is_active = 1
            GROUP BY category
            ORDER BY count DESC
        `)

        return NextResponse.json({
            visitors: {
                total: totalVisitors[0]?.total || 0,
                today: todayVisitors[0]?.total || 0,
                daily: visitorStats || []
            },
            contacts: contactLogs[0]?.total || 0,
            products: {
                total: productStats[0]?.total || 0,
                outOfStock: productStats[0]?.outOfStock || 0,
                lowStock: productStats[0]?.lowStock || 0
            },
            popular: popularProducts || [],
            categories: categoryStats || []
        })
    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}
