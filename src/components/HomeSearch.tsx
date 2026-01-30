'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeSearch() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <section className="py-4 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
                    ค้นหาอะไหล่รถยนต์มือสอง
                </h2>
                <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="พิมพ์ชื่ออะไหล่, ยี่ห้อ, หรือรุ่นรถ... (เช่น ผ้าเบรค, Toyota Vigo)"
                            className="w-full px-4 py-2 pl-10 rounded-full border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all text-sm md:text-base shadow-sm hover:shadow-md"
                        />
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <button
                            type="submit"
                            className="absolute right-1 top-1 bottom-1 px-4 bg-[var(--primary)] text-white rounded-full font-medium start-text text-sm hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2"
                        >
                            ค้นหา
                        </button>
                    </div>
                </form>
                <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span>คำค้นยอดนิยม:</span>
                    <button onClick={() => router.push('/products?search=ผ้าเบรค')} className="hover:text-[var(--primary)] underline">ผ้าเบรค</button>
                    <button onClick={() => router.push('/products?search=ไส้กรอง')} className="hover:text-[var(--primary)] underline">ไส้กรอง</button>
                    <button onClick={() => router.push('/products?search=น้ำมันเครื่อง')} className="hover:text-[var(--primary)] underline">น้ำมันเครื่อง</button>
                    <button onClick={() => router.push('/products?search=แบตเตอรี่')} className="hover:text-[var(--primary)] underline">แบตเตอรี่</button>
                </div>
            </div>
        </section>
    );
}
