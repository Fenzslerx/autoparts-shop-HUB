import { redirect } from "next/navigation"
import Link from "next/link"
import { isAuthenticated } from "@/lib/auth"
import { getProducts, deleteProduct } from "@/lib/db"
import { formatPrice, getCategoryById } from "@/lib/data"
import DeleteProductButton from "@/components/DeleteProductButton"

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
    const isAuth = await isAuthenticated()

    if (!isAuth) {
        redirect("/admin/login")
    }

    const products = await getProducts()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">จัดการสินค้า</h1>
                    <p className="text-[var(--text-secondary)] mt-1">ทั้งหมด {products.length} รายการ</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="btn-primary flex items-center gap-2"
                >
                    <span>➕</span>
                    <span>เพิ่มสินค้า</span>
                </Link>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
                {products.length === 0 ? (
                    <div className="p-12 text-center">
                        <span className="text-5xl">📦</span>
                        <p className="text-[var(--text-secondary)] mt-4">ยังไม่มีสินค้า</p>
                        <Link href="/admin/products/new" className="btn-primary inline-block mt-4">
                            เพิ่มสินค้าแรก
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-[var(--border)]">
                                <tr>
                                    <th className="text-left py-4 px-6 font-semibold text-[var(--text-secondary)]">สินค้า</th>
                                    <th className="text-left py-4 px-6 font-semibold text-[var(--text-secondary)]">หมวดหมู่</th>
                                    <th className="text-left py-4 px-6 font-semibold text-[var(--text-secondary)]">รถยนต์</th>
                                    <th className="text-right py-4 px-6 font-semibold text-[var(--text-secondary)]">ราคา</th>
                                    <th className="text-center py-4 px-6 font-semibold text-[var(--text-secondary)]">สต็อก</th>
                                    <th className="text-center py-4 px-6 font-semibold text-[var(--text-secondary)]">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => {
                                    const category = getCategoryById(product.category)
                                    return (
                                        <tr key={product.id} className="border-b border-[var(--border)] hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                                                        <img
                                                            src={product.imageUrl || '/uploads/default.jpg'}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-[var(--text-primary)]">{product.name}</p>
                                                        <p className="text-sm text-[var(--text-muted)]">{product.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="badge badge-primary">
                                                    {category?.icon} {category?.name || product.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="text-[var(--text-primary)]">{product.carBrand}</p>
                                                <p className="text-sm text-[var(--text-muted)]">{product.carModel}</p>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="font-semibold text-[var(--primary)]">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`badge ${product.stock > 5 ? 'badge-success' : 'bg-orange-100 text-orange-600'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/admin/products/${product.id}/edit`}
                                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                        title="แก้ไข"
                                                    >
                                                        ✏️
                                                    </Link>
                                                    <DeleteProductButton productId={product.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export const runtime = 'edge'
