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
    <section className="relative z-30 -mt-5 px-4 pb-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-5 shadow-[0_12px_36px_rgb(0,0,0,0.06)] backdrop-blur-xl md:p-7">
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-orange-100/50 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex flex-col gap-2 text-center">
              <h2 className="text-xl font-bold text-[var(--text-primary)] md:text-2xl">
                ค้นหาอะไหล่ได้ทันที
              </h2>
              <p className="text-sm text-[var(--text-secondary)] md:text-base">
                พิมพ์ชื่ออะไหล่ รุ่นรถ หรือยี่ห้อที่ต้องการ แล้วดูสินค้าได้เลย
              </p>
            </div>

            <form onSubmit={handleSearch} className="mx-auto max-w-3xl">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="เช่น ผ้าเบรก Vigo, ไฟหน้า Camry, กรองน้ำมัน"
                  className="h-14 w-full rounded-2xl border-2 border-[var(--border)] bg-gray-50/50 px-6 pl-14 text-base shadow-inner outline-none transition-all placeholder:text-gray-400 focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-[var(--primary)]/10 md:h-[62px] md:text-lg"
                />
                <svg
                  className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                  type="submit"
                  disabled={!query.trim()}
                  className="absolute bottom-2 right-2 top-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:text-base"
                >
                  ค้นหา
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span>คำค้นยอดนิยม:</span>
              <button onClick={() => setQuery('ผ้าเบรก')} className="hover:text-[var(--primary)] hover:underline">
                ผ้าเบรก
              </button>
              <span>•</span>
              <button onClick={() => setQuery('กรองน้ำมัน')} className="hover:text-[var(--primary)] hover:underline">
                กรองน้ำมัน
              </button>
              <span>•</span>
              <button onClick={() => setQuery('ไฟหน้า')} className="hover:text-[var(--primary)] hover:underline">
                ไฟหน้า
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
