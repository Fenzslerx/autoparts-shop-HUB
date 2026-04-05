import { Suspense } from 'react';
import SearchFilter from '@/components/products/SearchFilter';
import ProductGrid from '@/components/products/ProductGrid';
import PriceFilter from '@/components/products/PriceFilter';
import { VisitorLogger } from '@/components/common/VisitorLogger';
import { getProducts } from '@/lib/db';
import { carBrands, getCategoryById } from '@/lib/data';

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

            <div className="border-b border-[var(--border)] bg-white">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 md:py-7">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                        {categoryName ? `${categoryName}` : brandInfo ? `อะไหล่ ${brandInfo.name}` : 'สินค้าทั้งหมด'}
                    </h1>
                    <p className="mt-2 text-sm text-[var(--text-secondary)] md:text-base">
                        {allProducts.length} รายการ • ค้นหาและกรองได้ทันที
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <Suspense fallback={<div className="h-32 rounded-2xl bg-white animate-pulse" />}>
                    <SearchFilter />
                </Suspense>

                <Suspense fallback={<div className="mb-6 h-16 rounded-2xl bg-white animate-pulse" />}>
                    <PriceFilter />
                </Suspense>

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
