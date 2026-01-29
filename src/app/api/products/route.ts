import { NextRequest, NextResponse } from 'next/server'
import { getProducts, addProduct } from '@/lib/db'
import { logProductAction } from '@/lib/logger'
import { cookies } from 'next/headers'

// GET all products
export async function GET() {
    const products = await getProducts()
    return NextResponse.json({ products })
}

// POST new product (requires auth)
export async function POST(request: NextRequest) {
    // Check auth
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('admin_auth')

    if (authCookie?.value !== 'authenticated') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()

        const product = await addProduct({
            name: body.name,
            description: body.description || '',
            price: Number(body.price),
            carBrand: body.carBrand,
            carModel: body.carModel,
            carYear: body.carYear || '',
            category: body.category,
            imageUrl: body.imageUrl || '',
            images: body.images || [],
            stock: Number(body.stock) || 0,
            isActive: true,
        })

        // Log creation
        await logProductAction('create', { id: product.id, name: product.name })

        return NextResponse.json({ success: true, product })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }
}
