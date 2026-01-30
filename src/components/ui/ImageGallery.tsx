'use client'

import { useState, useRef, useEffect } from 'react'

interface ImageGalleryProps {
    images: string[]
    mainImage: string
    productName: string
}

export default function ImageGallery({ images, mainImage, productName }: ImageGalleryProps) {
    const allImages = images.length > 0 ? images : (mainImage ? [mainImage] : [])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    if (allImages.length === 0) {
        return (
            <div className="aspect-square bg-gray-100 flex items-center justify-center rounded-2xl">
                <span className="text-6xl">📦</span>
            </div>
        )
    }

    const scrollToImage = (index: number) => {
        setSelectedIndex(index)
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.clientWidth * index,
                behavior: 'smooth'
            })
        }
    }

    const handleScroll = () => {
        if (scrollRef.current) {
            const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth)
            setSelectedIndex(index)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image - Swipeable on mobile */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full w-full"
                    onScroll={handleScroll}
                >
                    {allImages.map((img, index) => (
                        <div key={index} className="flex-shrink-0 w-full h-full snap-center">
                            <img
                                src={img}
                                alt={`${productName} - ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation arrows (Desktop hover) */}
                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={() => scrollToImage(selectedIndex > 0 ? selectedIndex - 1 : allImages.length - 1)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full items-center justify-center hover:bg-white transition-all shadow-lg hidden group-hover:flex"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scrollToImage(selectedIndex < allImages.length - 1 ? selectedIndex + 1 : 0)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full items-center justify-center hover:bg-white transition-all shadow-lg hidden group-hover:flex"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Image counter / Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all shadow-sm ${index === selectedIndex ? 'bg-white w-4' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {allImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToImage(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === selectedIndex
                                ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/30'
                                : 'border-transparent hover:border-gray-300'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
