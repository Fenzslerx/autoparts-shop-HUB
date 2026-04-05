'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PriceFilterProps {
    minPrice?: number
    maxPrice?: number
}

export default function PriceFilter({ minPrice = 0, maxPrice = 50000 }: PriceFilterProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [min, setMin] = useState(searchParams.get('minPrice') || '')
    const [max, setMax] = useState(searchParams.get('maxPrice') || '')
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '')

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString())

        if (min) params.set('minPrice', min)
        else params.delete('minPrice')

        if (max) params.set('maxPrice', max)
        else params.delete('maxPrice')

        if (sortBy) params.set('sortBy', sortBy)
        else params.delete('sortBy')

        router.push(`/products?${params.toString()}`)
    }

    const clearFilters = () => {
        setMin('')
        setMax('')
        setSortBy('')
        const params = new URLSearchParams(searchParams.toString())
        params.delete('minPrice')
        params.delete('maxPrice')
        params.delete('sortBy')
        router.push(`/products?${params.toString()}`)
    }

    return (
        <div className="bg-white rounded-2xl border border-[var(--border)] p-4 mb-6">
            <div className="flex flex-wrap items-end gap-4">
                {/* Price Range */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">ราคา:</label>
                    <input
                        type="number"
                        placeholder="ต่ำสุด"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        className="w-24 px-3 py-2 text-sm border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                    <span className="text-[var(--text-muted)]">-</span>
                    <input
                        type="number"
                        placeholder="สูงสุด"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        className="w-24 px-3 py-2 text-sm border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">เรียงตาม:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 text-sm border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white"
                    >
                        <option value="">ล่าสุด</option>
                        <option value="price-asc">ราคา: ต่ำ → สูง</option>
                        <option value="price-desc">ราคา: สูง → ต่ำ</option>
                        <option value="name">ชื่อ ก-ฮ</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 ml-auto">
                    <button
                        onClick={applyFilters}
                        className="px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                    >
                        กรอง
                    </button>
                    {(min || max || sortBy) && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            ล้าง
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
