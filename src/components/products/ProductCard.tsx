'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import WishlistButton from './WishlistButton';
import StockBadge from './StockBadge';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-gray-50">
                <Image
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    loading="lazy"
                />

                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute left-3 top-3 z-10">
                    <span className="inline-flex items-center rounded-full border border-gray-100 bg-white/90 px-2.5 py-0.5 text-xs font-medium text-gray-800 shadow-sm backdrop-blur-sm">
                        {product.carBrand}
                    </span>
                </div>

                <div className="absolute right-12 top-3 z-10">
                    <StockBadge stock={product.stock} />
                </div>

                {product.stock === 0 && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
                        <span className="transform rounded-full bg-red-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg -rotate-6">สินค้าหมด</span>
                    </div>
                )}
            </Link>

            <div className="absolute right-3 top-3 z-20 transition-transform hover:scale-110">
                <WishlistButton productId={product.id} productName={product.name} size="sm" />
            </div>

            <div className="flex flex-1 flex-col p-3 md:p-4">
                <Link href={`/products/${product.id}`} className="flex-1 space-y-2 md:space-y-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 md:text-xs">
                        <span className="max-w-[80px] truncate rounded bg-blue-50 px-1.5 py-0.5 text-blue-600">
                            {product.carModel}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>{product.carYear}</span>
                    </div>

                    <h3 className="min-h-[2.5rem] text-sm font-bold leading-snug text-gray-900 transition-colors line-clamp-2 group-hover:text-[var(--primary)] md:min-h-[2.9rem] md:text-base">
                        {product.name}
                    </h3>

                    <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-2">
                        <div className="flex w-full flex-col">
                            <span className="mb-0.5 text-[10px] font-medium text-gray-400 md:text-xs">ราคา</span>
                            <div className="flex w-full items-center justify-between gap-2">
                                <span className="text-lg font-bold tracking-tight text-[var(--primary)] md:text-xl">
                                    {formatPrice(product.price)}
                                </span>
                                <span className="whitespace-nowrap rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white md:text-xs">
                                    ดูรายละเอียด
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </article>
    );
}
