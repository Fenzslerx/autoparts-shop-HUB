import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/db'
import { logProductAction } from '@/lib/logger'
import { cookies } from 'next/headers'


// Check auth helper
async function checkAuth() {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('admin_auth')
    return authCookie?.value === 'authenticated'
}

// GET single product
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const product = await getProductById(id)

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ product })
}

// PUT update product
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json() as any

    const product = await updateProduct(id, {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        carBrand: body.carBrand,
        carModel: body.carModel,
        carYear: body.carYear,
        category: body.category,
        imageUrl: body.imageUrl,
        images: body.images || [],
        stock: Number(body.stock),
        isActive: body.isActive,
    })

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Log update
    await logProductAction('update', { id: product.id, name: product.name })

    return NextResponse.json({ success: true, product })
}

// DELETE product
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const success = await deleteProduct(id)

    if (!success) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Log deletion
    await logProductAction('delete', { id })

    return NextResponse.json({ success: true })
}
