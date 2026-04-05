import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import AdminStatsPanel from '@/components/auth/AdminStatsPanel'
import { isAuthenticated } from '@/lib/auth'
import { categories } from '@/lib/data'
import { getProducts } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const isAuth = await isAuthenticated()

    if (!isAuth) {
        redirect('/admin/login')
    }

    const products = await getProducts()
    const totalProducts = products.length
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0)
    const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 5).length
    const outOfStock = products.filter((p) => p.stock === 0).length

    const categoryCounts = categories
        .map((cat) => ({
            ...cat,
            count: products.filter((p) => p.category === cat.id).length,
        }))
        .filter((c) => c.count > 0)

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">ยินดีต้อนรับ, Admin</h1>
                <p className="mt-2 text-[var(--text-secondary)]">จัดการร้านค้าและติดตามสถานะสินค้าได้จากที่นี่</p>
            </div>

            <div className="mb-8">
                <AdminStatsPanel />
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                            <span className="text-2xl">📦</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalProducts}</p>
                            <p className="text-sm text-[var(--text-secondary)]">สินค้าทั้งหมด</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                            <span className="text-2xl">🏷️</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalStock}</p>
                            <p className="text-sm text-[var(--text-secondary)]">สต็อกรวม</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-orange-500">{lowStockProducts}</p>
                            <p className="text-sm text-[var(--text-secondary)]">สินค้าใกล้หมด</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                            <span className="text-2xl">❌</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-500">{outOfStock}</p>
                            <p className="text-sm text-[var(--text-secondary)]">สินค้าหมด</p>
                        </div>
                    </div>
                </div>
            </div>

            {categoryCounts.length > 0 && (
                <div className="mb-8 rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-6">
                    <h2 className="mb-3 text-lg font-bold text-[var(--text-primary)]">สถิติแยกตามหมวดหมู่</h2>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6">
                        {categoryCounts.map((cat) => (
                            <div
                                key={cat.id}
                                className="flex flex-col items-center rounded-xl bg-[var(--background)] p-2 text-center sm:p-3"
                            >
                                <span className="text-lg sm:text-xl">{cat.icon}</span>
                                <p className="mt-1 line-clamp-1 text-xs font-medium text-[var(--text-primary)]">{cat.name}</p>
                                <p className="text-xs text-[var(--text-secondary)]">{cat.count}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">การดำเนินการด่วน</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Link
                        href="/admin/products/new"
                        className="flex items-center gap-4 rounded-xl bg-[var(--primary)] p-4 text-white transition-opacity hover:opacity-90"
                    >
                        <span className="text-2xl">➕</span>
                        <div>
                            <p className="font-semibold">เพิ่มสินค้าใหม่</p>
                            <p className="text-sm text-white/80">เพิ่มอะไหล่เข้าระบบอย่างรวดเร็ว</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/products"
                        className="flex items-center gap-4 rounded-xl bg-gray-100 p-4 text-[var(--text-primary)] transition-colors hover:bg-gray-200"
                    >
                        <span className="text-2xl">📋</span>
                        <div>
                            <p className="font-semibold">จัดการสินค้า</p>
                            <p className="text-sm text-[var(--text-secondary)]">แก้ไข ลบ และอัปเดตสต็อก</p>
                        </div>
                    </Link>
                </div>
            </div>

            {products.length > 0 && (
                <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6">
                    <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">สินค้าล่าสุด</h2>
                    <div className="space-y-3">
                        {products.slice(0, 5).map((product) => (
                            <div key={product.id} className="flex items-center gap-4 rounded-xl bg-[var(--background)] p-3">
                                <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-200">
                                    <Image
                                        src={product.imageUrl || product.images?.[0] || '/uploads/default.jpg'}
                                        alt={product.name}
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium text-[var(--text-primary)]">{product.name}</p>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {product.carBrand} {product.carModel}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-[var(--primary)]">฿{product.price.toLocaleString()}</p>
                                    <p
                                        className={`text-sm ${
                                            product.stock > 5 ? 'text-green-500' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'
                                        }`}
                                    >
                                        {product.stock > 0 ? `${product.stock} ชิ้น` : 'หมด'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
