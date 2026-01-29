'use client'

import { useState } from 'react'

interface ImageGalleryProps {
    images: string[]
    mainImage: string
    productName: string
}

export default function ImageGallery({ images, mainImage, productName }: ImageGalleryProps) {
    const allImages = images.length > 0 ? images : (mainImage ? [mainImage] : [])
    const [selectedIndex, setSelectedIndex] = useState(0)

    if (allImages.length === 0) {
        return (
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-6xl">📦</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                    src={allImages[selectedIndex]}
                    alt={`${productName} - ${selectedIndex + 1}`}
                    className="w-full h-full object-cover"
                />

                {/* Navigation arrows */}
                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={() => setSelectedIndex(prev => prev > 0 ? prev - 1 : allImages.length - 1)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                        >
                            ◀
                        </button>
                        <button
                            onClick={() => setSelectedIndex(prev => prev < allImages.length - 1 ? prev + 1 : 0)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                        >
                            ▶
                        </button>
                    </>
                )}

                {/* Image counter */}
                {allImages.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                        {selectedIndex + 1} / {allImages.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === selectedIndex
                                    ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/30'
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`${productName} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
