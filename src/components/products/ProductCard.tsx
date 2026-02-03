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
        <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative h-full flex flex-col">
            <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-50">
                {/* Image */}
                <Image
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    loading="lazy"
                />

                {/* Gradient Overlay for text contrast if needed */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm border border-gray-100">
                        {product.carBrand}
                    </span>
                </div>

                {/* Stock Badge */}
                <div className="absolute top-3 right-12 z-10">
                    <StockBadge stock={product.stock} />
                </div>

                {/* Out of stock overlay */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                        <span className="bg-red-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg transform -rotate-6">สินค้าหมด</span>
                    </div>
                )}
            </Link>

            {/* Wishlist Button */}
            <div className="absolute top-3 right-3 z-20 hover:scale-110 transition-transform">
                <WishlistButton productId={product.id} productName={product.name} size="sm" />
            </div>

            {/* Content */}
            <div className="p-3 md:p-4 flex flex-col flex-1">
                <Link href={`/products/${product.id}`} className="flex-1 space-y-2 md:space-y-3">
                    {/* Car Info */}
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-500 font-medium">
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 truncate max-w-[80px]">
                            {product.carModel}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>{product.carYear}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 text-sm md:text-lg leading-snug line-clamp-2 group-hover:text-[var(--primary)] transition-colors min-h-[2.5rem] md:min-h-[3.25rem]">
                        {product.name}
                    </h3>

                    {/* Price & Action */}
                    <div className="flex items-end justify-between pt-2 mt-auto border-t border-gray-50">
                        <div className="flex flex-col w-full">
                            <span className="text-[10px] md:text-xs text-gray-400 font-medium mb-0.5">ราคา</span>
                            <div className="flex items-center justify-between w-full gap-2">
                                <span className="text-lg md:text-2xl font-bold text-[var(--primary)] tracking-tight">
                                    {formatPrice(product.price)}
                                </span>
                                <span className="text-[10px] md:text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md whitespace-nowrap group-hover:bg-blue-600 group-hover:text-white transition-colors">
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
