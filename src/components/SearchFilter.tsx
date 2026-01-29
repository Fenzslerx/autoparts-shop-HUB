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

    // Get models for selected brand
    const selectedBrand = carBrands.find(b => b.id === filters.brand);
    const availableModels = selectedBrand?.models || [];

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        router.push(`/products?${params.toString()}`, { scroll: false });
        onFilterChange?.(filters);
    }, [filters, router, onFilterChange]);

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => {
            const newFilters = { ...prev, [key]: value };
            // Reset model when brand changes
            if (key === 'brand') {
                newFilters.model = '';
            }
            return newFilters;
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

    const hasActiveFilters = Object.values(filters).some(v => v !== '');

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6 mb-8">
            {/* Search Bar */}
            <div className="relative mb-4">
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="ค้นหาอะไหล่... (ชื่อ, ยี่ห้อ, รุ่น)"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-[var(--border)] rounded-xl text-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
                />
            </div>

            {/* Quick Category Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => handleFilterChange('category', '')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filters.category === ''
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
                        }`}
                >
                    ทั้งหมด
                </button>
                {categories.slice(0, 5).map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleFilterChange('category', cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filters.category === cat.id
                                ? 'bg-[var(--primary)] text-white'
                                : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
                            }`}
                    >
                        {cat.icon} {cat.name}
                    </button>
                ))}
            </div>

            {/* Toggle More Filters */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-[var(--primary)] font-medium mb-4"
            >
                <svg
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span>{isExpanded ? 'ซ่อนตัวกรอง' : 'ตัวกรองเพิ่มเติม'}</span>
            </button>

            {/* Expanded Filters */}
            {isExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-[var(--border)]">
                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            ยี่ห้อรถ
                        </label>
                        <select
                            value={filters.brand}
                            onChange={(e) => handleFilterChange('brand', e.target.value)}
                            className="w-full p-3 border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                        >
                            <option value="">ทุกยี่ห้อ</option>
                            {carBrands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Model */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            รุ่นรถ
                        </label>
                        <select
                            value={filters.model}
                            onChange={(e) => handleFilterChange('model', e.target.value)}
                            disabled={!filters.brand}
                            className="w-full p-3 border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">ทุกรุ่น</option>
                            {availableModels.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            หมวดหมู่
                        </label>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="w-full p-3 border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                        >
                            <option value="">ทุกหมวดหมู่</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            เรียงตาม
                        </label>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="w-full p-3 border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                        >
                            <option value="">ล่าสุด</option>
                            <option value="price-asc">ราคาต่ำ - สูง</option>
                            <option value="price-desc">ราคาสูง - ต่ำ</option>
                            <option value="name">ชื่อ ก-ฮ</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Clear Filters */}
            {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <button
                        onClick={clearFilters}
                        className="text-sm text-[var(--error)] hover:underline flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        ล้างตัวกรองทั้งหมด
                    </button>
                </div>
            )}
        </div>
    );
}
