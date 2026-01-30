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
        <section className="pb-8">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 relative overflow-hidden">
                    {/* Decorative background gradients for the card */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50"></div>

                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">
                        ค้นหาอะไหล่รถยนต์
                    </h2>

                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                        <div className="relative group">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="พิมพ์ชื่ออะไหล่, ยี่ห้อ, หรือรุ่นรถ... (เช่น ผ้าเบรค, Toyota Vigo)"
                                className="w-full px-6 py-4 pl-12 rounded-2xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 outline-none transition-all text-base md:text-lg shadow-sm group-hover:shadow-md bg-white/50 focus:bg-white"
                            />
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-6 bg-[var(--primary)] text-white rounded-xl font-bold text-base hover:bg-[var(--primary-dark)] transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                ค้นหา
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
