import { cookies } from 'next/headers'
import { getProductsFromD1, addProductToD1 } from '@/lib/cloudflare-db'
import { logProductAction } from '@/lib/logger'

// Disable all caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET all products
export async function GET() {
    const products = await getProductsFromD1()
    return new Response(JSON.stringify(products), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
    })
}

// POST create product
export async function POST(request: Request) {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('admin_auth')

    if (!authCookie || authCookie.value !== 'true') {
        return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json() as any
        const newProduct = await addProductToD1(body)

        // Log creation (don't fail if logging fails)
        try {
            await logProductAction('create', { id: newProduct.id, name: newProduct.name })
        } catch (logError) {
            console.error('Failed to log product action:', logError)
        }

        return Response.json({ success: true, product: newProduct })
    } catch (error) {
        console.error('Failed to create product:', error)
        return Response.json({ success: false, error: 'Failed to create product' }, { status: 500 })
    }
}
