'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/lib/types'

interface ProductGridProps {
    initialProducts: Product[]
    filters?: {
        search?: string
        category?: string
        brand?: string
        model?: string
    }
}

export default function ProductGrid({ initialProducts, filters }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const searchParams = useSearchParams()

    const fetchProducts = useCallback(async () => {
        try {
            setIsRefreshing(true)
            const res = await fetch('/api/products', {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache',
                }
            })
            if (res.ok) {
                const data = await res.json()
                setProducts(data)
            }
        } catch (error) {
            console.error('Failed to refresh products:', error)
        } finally {
            setIsRefreshing(false)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(fetchProducts, 30000)
        return () => clearInterval(interval)
    }, [fetchProducts])

    useEffect(() => {
        const handleFocus = () => {
            fetchProducts()
        }
        window.addEventListener('focus', handleFocus)
        return () => window.removeEventListener('focus', handleFocus)
    }, [fetchProducts])

    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy')

    let filteredProducts = [...products]

    if (filters?.search) {
        const query = filters.search.toLowerCase()
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.carBrand.toLowerCase().includes(query) ||
            p.carModel.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        )
    }

    if (filters?.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category)
    }

    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice))
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice))
    }

    switch (sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price)
            break
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price)
            break
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'th'))
            break
        default:
            filteredProducts.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
    }

    return (
        <div>
            {filteredProducts.length > 0 ? (
                <>
                    <div className="mb-4 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                        <p>{filteredProducts.length} รายการ</p>
                        <p className={`${isRefreshing ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                            กำลังอัปเดตข้อมูล...
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="py-16 text-center">
                    <div className="mb-4 text-6xl">🔍</div>
                    <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
                        ไม่พบสินค้า
                    </h2>
                    <p className="mb-6 text-[var(--text-secondary)]">
                        ลองค้นหาด้วยคำอื่น หรือเปลี่ยนตัวกรอง
                    </p>
                    <a href="/products" className="btn-primary inline-block">
                        ดูสินค้าทั้งหมด
                    </a>
                </div>
            )}
        </div>
    )
}
