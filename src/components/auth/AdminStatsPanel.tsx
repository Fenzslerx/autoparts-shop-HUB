'use client'

import { useEffect, useState } from 'react'

interface Stats {
    visitors: { total: number; today: number; daily: { date: string; count: number }[] }
    contacts: number
    products: { total: number; outOfStock: number; lowStock: number }
    popular: { product_id: string; views: number }[]
    categories: { category: string; count: number }[]
}

export default function AdminStatsPanel() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/stats')
            .then((res) => res.json())
            .then((data) => {
                setStats(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-2xl border border-[var(--border)] bg-white p-6 animate-pulse">
                        <div className="mb-4 h-12 rounded-xl bg-gray-100" />
                        <div className="h-6 w-1/2 rounded bg-gray-100" />
                    </div>
                ))}
            </div>
        )
    }

    if (!stats) return null

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                            <span className="text-2xl">👥</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{stats.visitors.total.toLocaleString()}</p>
                            <p className="text-sm text-blue-100">ผู้เข้าชมทั้งหมด</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                            <span className="text-2xl">📈</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{stats.visitors.today}</p>
                            <p className="text-sm text-green-100">เข้าชมวันนี้</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                            <span className="text-2xl">💬</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{stats.contacts}</p>
                            <p className="text-sm text-violet-100">การติดต่อ</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                            <span className="text-2xl">📦</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{stats.products.total}</p>
                            <p className="text-sm text-orange-100">จำนวนสินค้า</p>
                        </div>
                    </div>
                </div>
            </div>

            {stats.visitors.daily.length > 0 && (
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
                    <h3 className="mb-4 font-bold text-[var(--text-primary)]">ผู้เข้าชม 7 วันล่าสุด</h3>
                    <div className="flex h-32 items-end gap-2">
                        {stats.visitors.daily.slice(0, 7).reverse().map((day, i) => {
                            const maxCount = Math.max(...stats.visitors.daily.map((d) => d.count))
                            const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0
                            return (
                                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                                    <span className="text-xs text-[var(--text-muted)]">{day.count}</span>
                                    <div
                                        className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 transition-all"
                                        style={{ height: `${Math.max(height, 5)}%` }}
                                    />
                                    <span className="text-xs text-[var(--text-muted)]">
                                        {new Date(day.date).toLocaleDateString('th-TH', { weekday: 'short' })}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {(stats.products.outOfStock > 0 || stats.products.lowStock > 0) && (
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
                    <h3 className="mb-4 font-bold text-[var(--text-primary)]">แจ้งเตือนสต็อก</h3>
                    <div className="flex gap-4">
                        {stats.products.outOfStock > 0 && (
                            <div className="flex-1 rounded-xl border border-red-100 bg-red-50 p-4">
                                <p className="text-2xl font-bold text-red-600">{stats.products.outOfStock}</p>
                                <p className="text-sm text-red-600">สินค้าหมด</p>
                            </div>
                        )}
                        {stats.products.lowStock > 0 && (
                            <div className="flex-1 rounded-xl border border-orange-100 bg-orange-50 p-4">
                                <p className="text-2xl font-bold text-orange-600">{stats.products.lowStock}</p>
                                <p className="text-sm text-orange-600">สินค้าใกล้หมด</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
