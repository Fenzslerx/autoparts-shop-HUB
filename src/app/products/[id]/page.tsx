import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VisitorLogger } from '@/components/VisitorLogger';
import LineContactButton from '@/components/LineContactButton';
import ProductCard from '@/components/ProductCard';
import ImageGallery from '@/components/ImageGallery';
import { getProducts, getProductById } from '@/lib/db';
import { getCategoryById, formatPrice } from '@/lib/data';

export const dynamic = 'force-dynamic'

interface ProductDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    const category = getCategoryById(product.category);

    // Get related products (same category, different product)
    const allProducts = await getProducts();
    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <VisitorLogger page="product_detail" productId={product.id} />
            {/* Breadcrumb */}
            <div className="bg-white border-b border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
                            หน้าแรก
                        </Link>
                        <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link href="/products" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
                            สินค้า
                        </Link>
                        {category && (
                            <>
                                <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <Link
                                    href={`/products?category=${category.id}`}
                                    className="text-[var(--text-muted)] hover:text-[var(--primary)]"
                                >
                                    {category.name}
                                </Link>
                            </>
                        )}
                        <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-[var(--text-primary)] font-medium truncate max-w-[200px]">
                            {product.name}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Product Detail */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-3xl shadow-sm border border-[var(--border)] overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Image Section with Gallery */}
                        <div className="relative lg:aspect-auto lg:h-full p-4 lg:p-6">
                            <ImageGallery
                                images={product.images || []}
                                mainImage={product.imageUrl}
                                productName={product.name}
                            />
                            {/* Badges */}
                            <div className="absolute top-8 left-8 flex flex-wrap gap-2 z-10">
                                <span className="badge badge-primary bg-white/90 backdrop-blur-sm text-sm">
                                    {product.carBrand}
                                </span>
                                {category && (
                                    <span className="badge badge-secondary bg-white/90 backdrop-blur-sm text-sm">
                                        {category.icon} {category.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-8 lg:p-12 flex flex-col">
                            {/* Car Info */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-4 py-2 bg-[var(--background)] rounded-full text-sm font-medium text-[var(--text-secondary)]">
                                    🚗 {product.carModel}
                                </span>
                                <span className="px-4 py-2 bg-[var(--background)] rounded-full text-sm font-medium text-[var(--text-secondary)]">
                                    📅 ปี {product.carYear}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl lg:text-5xl font-bold text-[var(--primary)]">
                                    {formatPrice(product.price)}
                                </span>
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center gap-2 mb-6">
                                {product.stock > 5 ? (
                                    <>
                                        <span className="w-3 h-3 rounded-full bg-[var(--success)]"></span>
                                        <span className="text-[var(--success)] font-medium">มีสินค้า ({product.stock} ชิ้น)</span>
                                    </>
                                ) : product.stock > 0 ? (
                                    <>
                                        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                                        <span className="text-orange-500 font-medium">เหลือน้อย ({product.stock} ชิ้น)</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="w-3 h-3 rounded-full bg-[var(--error)]"></span>
                                        <span className="text-[var(--error)] font-medium">สินค้าหมด</span>
                                    </>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="font-semibold text-[var(--text-primary)] mb-2">รายละเอียดสินค้า</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {product.description || 'ไม่มีรายละเอียด'}
                                </p>
                            </div>

                            {/* Specifications */}
                            <div className="mb-8 p-4 bg-[var(--background)] rounded-xl">
                                <h2 className="font-semibold text-[var(--text-primary)] mb-3">ข้อมูลจำเพาะ</h2>
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

                            {/* CTA Button */}
                            <div className="mt-auto">
                                <LineContactButton
                                    productName={product.name}
                                    productId={product.id}
                                    price={product.price}
                                    fullWidth
                                />
                                <p className="text-center text-sm text-[var(--text-muted)] mt-3">
                                    กดปุ่มเพื่อสอบถามหรือสั่งซื้อผ่าน LINE ได้ทันที
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                        สินค้าที่เกี่ยวข้อง
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
