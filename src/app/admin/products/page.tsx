import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import DeleteProductButton from '@/components/products/DeleteProductButton'
import { isAuthenticated } from '@/lib/auth'
import { formatPrice, getCategoryById } from '@/lib/data'
import { getProducts } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
    const isAuth = await isAuthenticated()

    if (!isAuth) {
        redirect('/admin/login')
    }

    const products = await getProducts({ includeInactive: true })

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">จัดการสินค้า</h1>
                    <p className="mt-1 text-[var(--text-secondary)]">ทั้งหมด {products.length} รายการ</p>
                </div>
                <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
                    <span>➕</span>
                    <span>เพิ่มสินค้า</span>
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                {products.length === 0 ? (
                    <div className="p-12 text-center">
                        <span className="text-5xl">📦</span>
                        <p className="mt-4 text-[var(--text-secondary)]">ยังไม่มีสินค้า</p>
                        <Link href="/admin/products/new" className="btn-primary mt-4 inline-block">
                            เพิ่มสินค้ารายการแรก
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-[var(--border)]">
                        {products.map((product) => {
                            const category = getCategoryById(product.category)
                            return (
                                <div key={product.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-start gap-4">
                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-20 sm:w-20">
                                            <Image
                                                src={product.imageUrl || '/uploads/default.jpg'}
                                                alt={product.name}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <p className="truncate font-medium text-[var(--text-primary)]">{product.name}</p>
                                                    <p className="truncate text-xs text-[var(--text-muted)]">{product.id}</p>
                                                </div>
                                                <div className="flex flex-shrink-0 items-center gap-1">
                                                    <Link
                                                        href={`/admin/products/${product.id}/edit`}
                                                        className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                                                        title="แก้ไข"
                                                    >
                                                        ✏️
                                                    </Link>
                                                    <DeleteProductButton productId={product.id} />
                                                </div>
                                            </div>

                                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                                <span className="badge badge-primary text-xs">
                                                    {category?.icon} {category?.name || product.category}
                                                </span>
                                                <span className="text-xs text-[var(--text-secondary)]">
                                                    {product.carBrand} {product.carModel}
                                                </span>
                                            </div>

                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="font-semibold text-[var(--primary)]">{formatPrice(product.price)}</span>
                                                <span
                                                    className={`badge text-xs ${
                                                        product.stock > 5
                                                            ? 'badge-success'
                                                            : product.stock > 0
                                                              ? 'bg-orange-100 text-orange-600'
                                                              : 'bg-red-100 text-red-600'
                                                    }`}
                                                >
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
