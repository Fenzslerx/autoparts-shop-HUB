import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/data';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`}>
            <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover border border-[var(--border)]">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="badge badge-primary backdrop-blur-sm bg-white/90">
                            {product.carBrand}
                        </span>
                    </div>
                    {/* Stock Badge */}
                    {product.stock <= 5 && product.stock > 0 && (
                        <div className="absolute top-3 right-3">
                            <span className="badge bg-orange-100 text-orange-600">
                                เหลือ {product.stock} ชิ้น
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Car Info */}
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{product.carModel} | {product.carYear}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                        {product.description}
                    </p>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-bold text-[var(--primary)]">
                                {formatPrice(product.price)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--line-green)] font-semibold text-sm">
                            <span>ดูรายละเอียด</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
