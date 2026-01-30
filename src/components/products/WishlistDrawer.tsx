'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/data'

export default function WishlistDrawer() {
    const [isOpen, setIsOpen] = useState(false)
    const [wishlistItems, setWishlistItems] = useState<Product[]>([])
    const [wishlistIds, setWishlistIds] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const loadWishlist = async () => {
        const ids = JSON.parse(localStorage.getItem('wishlist') || '[]')
        setWishlistIds(ids)

        if (ids.length > 0) {
            setIsLoading(true)
            try {
                const res = await fetch('/api/products')
                if (res.ok) {
                    const products = await res.json()
                    setWishlistItems(products.filter((p: Product) => ids.includes(p.id)))
                }
            } catch (error) {
                console.error('Failed to load wishlist:', error)
            }
            setIsLoading(false)
        } else {
            setWishlistItems([])
        }
    }

    useEffect(() => {
        loadWishlist()
        window.addEventListener('wishlistUpdated', loadWishlist)
        return () => window.removeEventListener('wishlistUpdated', loadWishlist)
    }, [])

    const removeFromWishlist = (productId: string) => {
        const newIds = wishlistIds.filter(id => id !== productId)
        localStorage.setItem('wishlist', JSON.stringify(newIds))
        setWishlistIds(newIds)
        setWishlistItems(wishlistItems.filter(p => p.id !== productId))
        window.dispatchEvent(new CustomEvent('wishlistUpdated'))
    }

    const clearWishlist = () => {
        localStorage.setItem('wishlist', JSON.stringify([]))
        setWishlistIds([])
        setWishlistItems([])
        window.dispatchEvent(new CustomEvent('wishlistUpdated'))
    }

    const generateQuote = () => {
        const items = wishlistItems.map(p => `• ${p.name} - ${formatPrice(p.price)}`).join('\n')
        const total = wishlistItems.reduce((sum, p) => sum + p.price, 0)
        const message = `📋 รายการสินค้าที่สนใจ:\n\n${items}\n\n💰 รวม: ${formatPrice(total)}\n\nสนใจสอบถามรายละเอียดเพิ่มเติมครับ`
        const encoded = encodeURIComponent(message)
        window.open(`https://line.me/R/oaMessage/@mavarix?${encoded}`, '_blank')
    }

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistIds.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-white text-red-500 text-xs font-bold rounded-full flex items-center justify-center shadow">
                        {wishlistIds.length}
                    </span>
                )}
            </button>

            {/* Drawer */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} />
                    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl animate-slide-in-right">
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                                    ❤️ รายการโปรด
                                    <span className="text-sm font-normal text-[var(--text-muted)]">({wishlistItems.length} รายการ)</span>
                                </h2>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-32">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
                                    </div>
                                ) : wishlistItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <span className="text-5xl mb-4 block">💔</span>
                                        <p className="text-[var(--text-secondary)]">ยังไม่มีสินค้าในรายการโปรด</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {wishlistItems.map(product => (
                                            <div key={product.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                                                <Link href={`/products/${product.id}`} onClick={() => setIsOpen(false)}>
                                                    <img src={product.imageUrl || '/uploads/default.jpg'} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                                                </Link>
                                                <div className="flex-1 min-w-0">
                                                    <Link href={`/products/${product.id}`} onClick={() => setIsOpen(false)} className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] line-clamp-2">
                                                        {product.name}
                                                    </Link>
                                                    <p className="text-sm text-[var(--text-muted)]">{product.carBrand} {product.carModel}</p>
                                                    <p className="text-[var(--primary)] font-semibold">{formatPrice(product.price)}</p>
                                                </div>
                                                <button onClick={() => removeFromWishlist(product.id)} className="text-gray-400 hover:text-red-500 p-1">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {wishlistItems.length > 0 && (
                                <div className="p-4 border-t space-y-3">
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="font-medium">รวมทั้งหมด:</span>
                                        <span className="font-bold text-[var(--primary)]">
                                            {formatPrice(wishlistItems.reduce((sum, p) => sum + p.price, 0))}
                                        </span>
                                    </div>
                                    <button onClick={generateQuote} className="btn-line w-full justify-center">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                        </svg>
                                        ส่งใบเสนอราคาทาง LINE
                                    </button>
                                    <button onClick={clearWishlist} className="w-full text-sm text-[var(--text-muted)] hover:text-red-500">
                                        ล้างรายการทั้งหมด
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes slide-in-right {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out;
                }
            `}</style>
        </>
    )
}
