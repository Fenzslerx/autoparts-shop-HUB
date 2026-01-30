'use client'

import { useState, useEffect, useCallback } from 'react'
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

    // Auto-refresh every 10 seconds
    useEffect(() => {
        const interval = setInterval(fetchProducts, 10000)
        return () => clearInterval(interval)
    }, [fetchProducts])

    // Refresh on window focus
    useEffect(() => {
        const handleFocus = () => {
            fetchProducts()
        }
        window.addEventListener('focus', handleFocus)
        return () => window.removeEventListener('focus', handleFocus)
    }, [fetchProducts])

    // Filter products client-side
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

    // Sort by newest first
    filteredProducts.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return (
        <div>
            {/* Refresh indicator */}
            {isRefreshing && (
                <div className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-blue-500 text-white rounded-full text-sm flex items-center gap-2 shadow-lg">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    กำลังอัพเดท...
                </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                        ไม่พบสินค้า
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-6">
                        ลองค้นหาด้วยคำอื่น หรือล้างตัวกรอง
                    </p>
                    <a href="/products" className="btn-primary inline-block">
                        ดูสินค้าทั้งหมด
                    </a>
                </div>
            )}
        </div>
    )
}
