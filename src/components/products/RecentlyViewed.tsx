'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/data'

const MAX_RECENT = 8

export function saveToRecentlyViewed(productId: string) {
    if (typeof window === 'undefined') return
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    const filtered = recent.filter((id: string) => id !== productId)
    const updated = [productId, ...filtered].slice(0, MAX_RECENT)
    localStorage.setItem('recentlyViewed', JSON.stringify(updated))
}

export default function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const loadRecent = async () => {
            const ids = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
            const filteredIds = currentProductId ? ids.filter((id: string) => id !== currentProductId) : ids

            if (filteredIds.length > 0) {
                try {
                    const res = await fetch('/api/products')
                    if (res.ok) {
                        const allProducts = await res.json()
                        const recentProducts = filteredIds
                            .map((id: string) => allProducts.find((p: Product) => p.id === id))
                            .filter(Boolean)
                            .slice(0, 4)
                        setProducts(recentProducts)
                    }
                } catch (error) {
                    console.error('Failed to load recently viewed:', error)
                }
            }
        }
        loadRecent()
    }, [currentProductId])

    if (products.length === 0) return null

    return (
        <section className="py-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span className="text-2xl">👁️</span> สินค้าที่เพิ่งดู
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {products.map(product => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex-shrink-0 w-40 group"
                    >
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
                            <img
                                src={product.imageUrl || '/uploads/default.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                        </div>
                        <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--primary)]">
                            {product.name}
                        </p>
                        <p className="text-sm text-[var(--primary)] font-semibold">
                            {formatPrice(product.price)}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}
