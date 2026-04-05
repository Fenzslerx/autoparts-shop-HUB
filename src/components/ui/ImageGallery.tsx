'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

interface ImageGalleryProps {
    images: string[]
    mainImage: string
    productName: string
}

export default function ImageGallery({ images, mainImage, productName }: ImageGalleryProps) {
    const allImages = images.length > 0 ? images : mainImage ? [mainImage] : []
    const [selectedIndex, setSelectedIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    if (allImages.length === 0) {
        return (
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-100">
                <span className="text-6xl">📦</span>
            </div>
        )
    }

    const scrollToImage = (index: number) => {
        setSelectedIndex(index)
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.clientWidth * index,
                behavior: 'smooth',
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
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <div ref={scrollRef} className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide" onScroll={handleScroll}>
                    {allImages.map((img, index) => (
                        <div key={index} className="relative h-full w-full flex-shrink-0 snap-center">
                            <Image
                                src={img}
                                alt={`${productName} - ${index + 1}`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>

                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={() => scrollToImage(selectedIndex > 0 ? selectedIndex - 1 : allImages.length - 1)}
                            className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white group-hover:flex"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scrollToImage(selectedIndex < allImages.length - 1 ? selectedIndex + 1 : 0)}
                            className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white group-hover:flex"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {allImages.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full shadow-sm transition-all ${index === selectedIndex ? 'w-4 bg-white' : 'w-2 bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {allImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToImage(index)}
                            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                                index === selectedIndex
                                    ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/30'
                                    : 'border-transparent hover:border-gray-300'
                            }`}
                        >
                            <Image src={img} alt={`Thumbnail ${index + 1}`} fill sizes="80px" className="object-cover" unoptimized />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
