'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { formatPrice } from '@/lib/data'
import { Product } from '@/lib/types'

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
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
                <span className="text-2xl">👁️</span> ดูล่าสุด
            </h2>
            <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`} className="group w-40 flex-shrink-0">
                        <div className="relative mb-2 aspect-square overflow-hidden rounded-xl bg-gray-100">
                            <Image
                                src={product.imageUrl || '/uploads/default.jpg'}
                                alt={product.name}
                                fill
                                sizes="160px"
                                className="object-cover transition-transform group-hover:scale-105"
                                unoptimized
                            />
                        </div>
                        <p className="line-clamp-2 text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)]">
                            {product.name}
                        </p>
                        <p className="text-sm font-semibold text-[var(--primary)]">{formatPrice(product.price)}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}
