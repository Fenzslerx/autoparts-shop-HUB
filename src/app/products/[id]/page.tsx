import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/products/ProductCard'
import RecentlyViewed from '@/components/products/RecentlyViewed'
import ShareButtons from '@/components/products/ShareButtons'
import WishlistButton from '@/components/products/WishlistButton'
import { VisitorLogger } from '@/components/common/VisitorLogger'
import LineContactButton from '@/components/ui/LineContactButton'
import ImageGallery from '@/components/ui/ImageGallery'
import { formatPrice, getCategoryById } from '@/lib/data'
import { getProductById, getProducts } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface ProductDetailPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params
    const product = await getProductById(id)

    if (!product) {
        notFound()
    }

    const category = getCategoryById(product.category)
    const allProducts = await getProducts()
    const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <VisitorLogger page="product_detail" productId={product.id} />

            <div className="border-b border-[var(--border)] bg-white">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
                            หน้าแรก
                        </Link>
                        <svg className="h-4 w-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link href="/products" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
                            สินค้า
                        </Link>
                        {category && (
                            <>
                                <svg className="h-4 w-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <Link href={`/products?category=${category.id}`} className="text-[var(--text-muted)] hover:text-[var(--primary)]">
                                    {category.name}
                                </Link>
                            </>
                        )}
                        <svg className="h-4 w-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="max-w-[200px] truncate font-medium text-[var(--text-primary)]">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-sm">
                    <div className="grid gap-0 lg:grid-cols-2">
                        <div className="relative p-4 lg:h-full lg:p-6">
                            <ImageGallery images={product.images || []} mainImage={product.imageUrl} productName={product.name} />
                            <div className="absolute left-8 top-8 z-10 flex flex-wrap gap-2">
                                <span className="badge badge-primary bg-white/90 text-sm backdrop-blur-sm">{product.carBrand}</span>
                                {category && (
                                    <span className="badge badge-secondary bg-white/90 text-sm backdrop-blur-sm">
                                        {category.icon} {category.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col p-5 md:p-8 lg:p-12">
                            <div className="mb-4 flex items-center gap-4">
                                <span className="rounded-full bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)]">
                                    🚗 {product.carModel}
                                </span>
                                <span className="rounded-full bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)]">
                                    📅 ปี {product.carYear}
                                </span>
                            </div>

                            <h1 className="mb-4 text-2xl font-bold text-[var(--text-primary)] lg:text-3xl">{product.name}</h1>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-[var(--primary)] lg:text-5xl">{formatPrice(product.price)}</span>
                            </div>

                            <div className="mb-6 flex items-center gap-2">
                                {product.stock > 5 ? (
                                    <>
                                        <span className="h-3 w-3 rounded-full bg-[var(--success)]" />
                                        <span className="font-medium text-[var(--success)]">มีสินค้า ({product.stock} ชิ้น)</span>
                                    </>
                                ) : product.stock > 0 ? (
                                    <>
                                        <span className="h-3 w-3 rounded-full bg-orange-500" />
                                        <span className="font-medium text-orange-500">เหลือน้อย ({product.stock} ชิ้น)</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="h-3 w-3 rounded-full bg-[var(--error)]" />
                                        <span className="font-medium text-[var(--error)]">สินค้าหมด</span>
                                    </>
                                )}
                            </div>

                            <div className="mb-8">
                                <h2 className="mb-2 font-semibold text-[var(--text-primary)]">รายละเอียดสินค้า</h2>
                                <p className="leading-relaxed text-[var(--text-secondary)]">{product.description || 'ยังไม่มีรายละเอียดเพิ่มเติม'}</p>
                            </div>

                            <div className="mb-8 rounded-xl bg-[var(--background)] p-4">
                                <h2 className="mb-3 font-semibold text-[var(--text-primary)]">ข้อมูลเฉพาะ</h2>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-[var(--text-muted)]">ยี่ห้อรถ:</span>
                                        <span className="ml-2 font-medium text-[var(--text-primary)]">{product.carBrand}</span>
                                    </div>
                                    <div>
                                        <span className="text-[var(--text-muted)]">รุ่นรถ:</span>
                                        <span className="ml-2 font-medium text-[var(--text-primary)]">{product.carModel}</span>
                                    </div>
                                    <div>
                                        <span className="text-[var(--text-muted)]">ปีรถ:</span>
                                        <span className="ml-2 font-medium text-[var(--text-primary)]">{product.carYear}</span>
                                    </div>
                                    <div>
                                        <span className="text-[var(--text-muted)]">รหัสสินค้า:</span>
                                        <span className="ml-2 font-medium text-[var(--text-primary)]">{product.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 flex items-center gap-4">
                                <WishlistButton productId={product.id} productName={product.name} size="lg" />
                                <ShareButtons url={`/products/${product.id}`} title={product.name} price={product.price} />
                            </div>

                            <div className="mt-auto">
                                <LineContactButton productName={product.name} productId={product.id} price={product.price} fullWidth />
                                <p className="mt-3 text-center text-sm text-[var(--text-muted)]">
                                    กดปุ่มเพื่อสอบถามหรือสั่งซื้อผ่าน LINE ได้ทันที
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <RecentlyViewed currentProductId={product.id} />
            </div>

            {relatedProducts.length > 0 && (
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">สินค้าใกล้เคียง</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
