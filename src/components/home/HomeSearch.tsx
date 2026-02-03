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
        <section className="pb-8 -mt-6 relative z-30 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
                    {/* Decorative background gradients for the card */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-30"></div>
                    <div className="absolute -left-10 -top-10 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-orange-100/50 rounded-full blur-3xl pointer-events-none"></div>

                    <h2 className="text-xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 md:mb-8">
                        ค้นหาอะไหล่รถยนต์
                    </h2>

                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                        <div className="relative group">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="พิมพ์ชื่ออะไหล่... (เช่น ผ้าเบรค Vigo)"
                                className="w-full h-14 md:h-16 px-6 pl-14 rounded-2xl border-2 border-[var(--border)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 outline-none transition-all text-base md:text-lg shadow-inner bg-gray-50/50 focus:bg-white placeholder:text-gray-400"
                            />
                            <svg
                                className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-6 bg-[var(--primary)] text-white rounded-xl font-bold text-base hover:bg-[var(--primary-dark)] transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!query.trim()}
                            >
                                ค้นหา
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                        <span>ยอดนิยม:</span>
                        <button onClick={() => setQuery('ผ้าเบรค')} className="hover:text-[var(--primary)] hover:underline">ผ้าเบรค</button>
                        <span>•</span>
                        <button onClick={() => setQuery('กรองน้ำมัน')} className="hover:text-[var(--primary)] hover:underline">กรองน้ำมัน</button>
                        <span>•</span>
                        <button onClick={() => setQuery('ไฟหน้า')} className="hover:text-[var(--primary)] hover:underline">ไฟหน้า</button>
                    </div>
                </div>
            </div>
        </section>
    );

}
