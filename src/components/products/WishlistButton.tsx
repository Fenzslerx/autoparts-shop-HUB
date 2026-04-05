'use client'

import { useState, useEffect } from 'react'

interface WishlistButtonProps {
    productId: string
    productName: string
    size?: 'sm' | 'md' | 'lg'
}

export default function WishlistButton({ productId, productName, size = 'md' }: WishlistButtonProps) {
    const [isInWishlist, setIsInWishlist] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
        setIsInWishlist(wishlist.includes(productId))
    }, [productId])

    const toggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
        let newWishlist: string[]

        if (isInWishlist) {
            newWishlist = wishlist.filter((id: string) => id !== productId)
        } else {
            newWishlist = [...wishlist, productId]
            setIsAnimating(true)
            setTimeout(() => setIsAnimating(false), 300)
        }

        localStorage.setItem('wishlist', JSON.stringify(newWishlist))
        setIsInWishlist(!isInWishlist)

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('wishlistUpdated'))
    }

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    }

    return (
        <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist() }}
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ${isInWishlist
                    ? 'bg-red-50 text-red-500 hover:bg-red-100'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-400'
                } ${isAnimating ? 'scale-125' : 'scale-100'}`}
            title={isInWishlist ? 'ลบออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
        >
            <svg className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`} fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
    )
}
