import { cookies } from 'next/headers'
import { getProductsFromD1, addProductToD1 } from '@/lib/cloudflare-db'
import { logProductAction } from '@/lib/logger'

export const runtime = 'edge'

// GET all products
export async function GET() {
    const products = await getProductsFromD1()
    return Response.json(products)
}

// POST create product
export async function POST(request: Request) {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('admin_auth')

    if (!authCookie || authCookie.value !== 'true') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const newProduct = await addProductToD1(body)

        // Log creation
        await logProductAction('create', { id: newProduct.id, name: newProduct.name })

        return Response.json(newProduct)
    } catch (error) {
        return Response.json({ error: 'Failed to create product' }, { status: 500 })
    }
}
