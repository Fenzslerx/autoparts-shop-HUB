'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories, carBrands } from '@/lib/data';

interface SearchFilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  category: string;
  brand: string;
  model: string;
  sortBy: string;
}

export default function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    model: searchParams.get('model') || '',
    sortBy: searchParams.get('sortBy') || '',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const selectedBrand = carBrands.find((brand) => brand.id === filters.brand);
  const availableModels = selectedBrand?.models || [];

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/products?${params.toString()}`, { scroll: false });
    onFilterChange?.(filters);
  }, [filters, router, onFilterChange]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'brand') {
        next.model = '';
      }
      return next;
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      model: '',
      sortBy: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== '');

  return (
    <div className="mb-6 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm md:p-5">
      <div className="relative mb-4">
        <svg
          className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[var(--text-muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="ค้นหาอะไหล่ ชื่อรุ่น หรือยี่ห้อรถ"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full rounded-xl border-2 border-[var(--border)] py-3.5 pl-12 pr-4 text-base transition-colors focus:border-[var(--primary)] focus:outline-none"
        />
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange('category', '')}
          className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
            filters.category === '' ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
          }`}
        >
          ทั้งหมด
        </button>
        {categories.slice(0, 5).map((category) => (
          <button
            key={category.id}
            onClick={() => handleFilterChange('category', category.id)}
            className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
              filters.category === category.id ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 font-medium text-[var(--primary)]"
        >
          <svg
            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span>{isExpanded ? 'ซ่อนตัวกรอง' : 'ตัวกรองเพิ่มเติม'}</span>
        </button>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-[var(--error)] hover:underline">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            ล้างทั้งหมด
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-[var(--border)] pt-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">ยี่ห้อรถ</label>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="w-full rounded-xl border-2 border-[var(--border)] p-3 focus:border-[var(--primary)] focus:outline-none"
            >
              <option value="">ทุกยี่ห้อ</option>
              {carBrands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">รุ่นรถ</label>
            <select
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              disabled={!filters.brand}
              className="w-full rounded-xl border-2 border-[var(--border)] p-3 focus:border-[var(--primary)] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">ทุกรุ่น</option>
              {availableModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">หมวดหมู่</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full rounded-xl border-2 border-[var(--border)] p-3 focus:border-[var(--primary)] focus:outline-none"
            >
              <option value="">ทุกหมวดหมู่</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">เรียงตาม</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full rounded-xl border-2 border-[var(--border)] p-3 focus:border-[var(--primary)] focus:outline-none"
            >
              <option value="">ล่าสุด</option>
              <option value="price-asc">ราคาต่ำ - สูง</option>
              <option value="price-desc">ราคาสูง - ต่ำ</option>
              <option value="name">ชื่อ ก-ฮ</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
