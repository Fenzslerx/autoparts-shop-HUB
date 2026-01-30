import { redirect } from "next/navigation"
import Link from "next/link"
import { isAuthenticated } from "@/lib/auth"
import { getProducts, deleteProduct } from "@/lib/db"
import { formatPrice, getCategoryById } from "@/lib/data"
import DeleteProductButton from "@/components/products/DeleteProductButton"

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

            {/* Products List - Card Layout for Mobile */}
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
                    <div className="divide-y divide-[var(--border)]">
                        {products.map((product) => {
                            const category = getCategoryById(product.category)
                            return (
                                <div key={product.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-start gap-4">
                                        {/* Image */}
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                            <img
                                                src={product.imageUrl || '/uploads/default.jpg'}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <p className="font-medium text-[var(--text-primary)] truncate">{product.name}</p>
                                                    <p className="text-xs text-[var(--text-muted)] truncate">{product.id}</p>
                                                </div>
                                                {/* Actions */}
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <Link
                                                        href={`/admin/products/${product.id}/edit`}
                                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                        title="แก้ไข"
                                                    >
                                                        ✏️
                                                    </Link>
                                                    <DeleteProductButton productId={product.id} />
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                                <span className="badge badge-primary text-xs">
                                                    {category?.icon} {category?.name || product.category}
                                                </span>
                                                <span className="text-xs text-[var(--text-secondary)]">
                                                    {product.carBrand} {product.carModel}
                                                </span>
                                            </div>

                                            {/* Price & Stock */}
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="font-semibold text-[var(--primary)]">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <span className={`badge text-xs ${product.stock > 5 ? 'badge-success' : product.stock > 0 ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
                                                    {product.stock > 0 ? `${product.stock} ชิ้น` : 'หมด'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

