import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/db'
import { getLogs } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const [products, visitorLogs, contactLogs] = await Promise.all([
            getProducts({ includeInactive: true }),
            getLogs({ type: 'visitor', limit: 1000 }),
            getLogs({ type: 'contact', limit: 1000 }),
        ])

        const activeProducts = products.filter(product => product.isActive !== false)
        const today = new Date().toISOString().slice(0, 10)
        const visitorByDate = new Map<string, number>()
        const popularByProduct = new Map<string, number>()
        const categoryByCount = new Map<string, number>()

        visitorLogs.forEach(log => {
            const date = log.timestamp.slice(0, 10)
            visitorByDate.set(date, (visitorByDate.get(date) || 0) + 1)

            const productId = typeof log.data?.productId === 'string' ? log.data.productId : ''
            if (productId) {
                popularByProduct.set(productId, (popularByProduct.get(productId) || 0) + 1)
            }
        })

        activeProducts.forEach(product => {
            categoryByCount.set(product.category, (categoryByCount.get(product.category) || 0) + 1)
        })

        const visitorStats = Array.from(visitorByDate.entries())
            .sort((a, b) => b[0].localeCompare(a[0]))
            .slice(0, 7)
            .map(([date, count]) => ({ date, count }))

        const popularProducts = Array.from(popularByProduct.entries())
            .map(([product_id, views]) => ({ product_id, views }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)

        const categoryStats = Array.from(categoryByCount.entries())
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => b.count - a.count)

        return NextResponse.json({
            visitors: {
                total: visitorLogs.length,
                today: visitorLogs.filter(log => log.timestamp.slice(0, 10) === today).length,
                daily: visitorStats
            },
            contacts: contactLogs.length,
            products: {
                total: activeProducts.length,
                outOfStock: activeProducts.filter(product => product.stock === 0).length,
                lowStock: activeProducts.filter(product => product.stock > 0 && product.stock <= 3).length
            },
            popular: popularProducts,
            categories: categoryStats
        })
    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}
