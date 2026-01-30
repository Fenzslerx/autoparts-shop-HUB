import { Suspense } from 'react';
import SearchFilter from '@/components/products/SearchFilter';
import ProductGrid from '@/components/products/ProductGrid';
import PriceFilter from '@/components/products/PriceFilter';
import { VisitorLogger } from '@/components/common/VisitorLogger';
import { getProducts } from '@/lib/db';
import { carBrands, getCategoryById } from '@/lib/data';

// Disable all caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ProductsPageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        brand?: string;
        model?: string;
        sortBy?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams;
    const allProducts = await getProducts();
    const categoryName = params.category ? getCategoryById(params.category)?.name : null;
    const brandInfo = params.brand ? carBrands.find(b => b.id === params.brand) : null;

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <VisitorLogger page="products" />
            {/* Page Header */}
            <div className="bg-white border-b border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                        {categoryName ? `${categoryName}` : brandInfo ? `อะไหล่ ${brandInfo.name}` : 'สินค้าทั้งหมด'}
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-2">
                        {allProducts.length} รายการ • อัพเดทอัตโนมัติทุก 10 วินาที
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Filter */}
                <Suspense fallback={<div className="h-32 bg-white rounded-2xl animate-pulse" />}>
                    <SearchFilter />
                </Suspense>

                {/* Price Filter & Sort */}
                <Suspense fallback={<div className="h-16 bg-white rounded-2xl animate-pulse mb-6" />}>
                    <PriceFilter />
                </Suspense>

                {/* Products Grid with Auto-Refresh */}
                <ProductGrid
                    initialProducts={allProducts}
                    filters={{
                        search: params.search,
                        category: params.category,
                        brand: params.brand,
                        model: params.model
                    }}
                />
            </div>
        </div>
    );
}
