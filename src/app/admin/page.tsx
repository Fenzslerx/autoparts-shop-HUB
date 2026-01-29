import { redirect } from "next/navigation"
import Link from "next/link"
import { isAuthenticated } from "@/lib/auth"
import { getProducts } from "@/lib/db"
import { categories, carBrands } from "@/lib/data"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const isAuth = await isAuthenticated()

    if (!isAuth) {
        redirect("/admin/login")
    }

    // Get real data from database
    const products = await getProducts()
    const totalProducts = products.length
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0)
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5).length
    const outOfStock = products.filter(p => p.stock === 0).length

    // Count by category
    const categoryCounts = categories.map(cat => ({
        ...cat,
        count: products.filter(p => p.category === cat.id).length
    })).filter(c => c.count > 0)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                    ยินดีต้อนรับ, Admin
                </h1>
                <p className="text-[var(--text-secondary)] mt-2">
                    จัดการร้านค้าของคุณได้ที่นี่
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <span className="text-2xl">📦</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalProducts}</p>
                            <p className="text-sm text-[var(--text-secondary)]">สินค้าทั้งหมด</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <span className="text-2xl">🏷️</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalStock}</p>
                            <p className="text-sm text-[var(--text-secondary)]">สต็อกทั้งหมด</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-orange-500">{lowStockProducts}</p>
                            <p className="text-sm text-[var(--text-secondary)]">สินค้าใกล้หมด</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                            <span className="text-2xl">❌</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-500">{outOfStock}</p>
                            <p className="text-sm text-[var(--text-secondary)]">สินค้าหมด</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Stats */}
            {categoryCounts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)] mb-8">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">สินค้าตามหมวดหมู่</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categoryCounts.map(cat => (
                            <div key={cat.id} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-xl">
                                <span className="text-2xl">{cat.icon}</span>
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">{cat.name}</p>
                                    <p className="text-sm text-[var(--text-secondary)]">{cat.count} รายการ</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">การดำเนินการด่วน</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/admin/products/new"
                        className="flex items-center gap-4 p-4 rounded-xl bg-[var(--primary)] text-white hover:opacity-90 transition-opacity"
                    >
                        <span className="text-2xl">➕</span>
                        <div>
                            <p className="font-semibold">เพิ่มสินค้าใหม่</p>
                            <p className="text-sm text-white/80">เพิ่มอะไหล่เข้าระบบ</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/products"
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-100 text-[var(--text-primary)] hover:bg-gray-200 transition-colors"
                    >
                        <span className="text-2xl">📋</span>
                        <div>
                            <p className="font-semibold">จัดการสินค้า</p>
                            <p className="text-sm text-[var(--text-secondary)]">แก้ไข/ลบสินค้า</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Products */}
            {products.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl p-6 border border-[var(--border)]">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">สินค้าล่าสุด</h2>
                    <div className="space-y-3">
                        {products.slice(0, 5).map(product => (
                            <div key={product.id} className="flex items-center gap-4 p-3 bg-[var(--background)] rounded-xl">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                                    <img
                                        src={product.imageUrl || product.images?.[0] || '/uploads/default.jpg'}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[var(--text-primary)] truncate">{product.name}</p>
                                    <p className="text-sm text-[var(--text-secondary)]">{product.carBrand} {product.carModel}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-[var(--primary)]">฿{product.price.toLocaleString()}</p>
                                    <p className={`text-sm ${product.stock > 5 ? 'text-green-500' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
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

export const runtime = 'edge'
