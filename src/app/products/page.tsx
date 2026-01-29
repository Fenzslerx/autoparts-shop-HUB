import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import SearchFilter from '@/components/SearchFilter';
import { VisitorLogger } from '@/components/VisitorLogger';
import { getProducts } from '@/lib/db';
import { categories, carBrands, getCategoryById } from '@/lib/data';
import { Product } from '@/lib/types';

export const dynamic = 'force-dynamic'
// export const runtime = 'edge'

interface ProductsPageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        brand?: string;
        model?: string;
        sortBy?: string;
    }>;
}

function filterProducts(
    allProducts: Product[],
    filters: {
        search?: string;
        category?: string;
        brand?: string;
        model?: string;
        sortBy?: string;
    }
): Product[] {
    let filtered = [...allProducts];

    // Filter by search
    if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.carBrand.toLowerCase().includes(query) ||
            p.carModel.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    // Filter by category
    if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
    }

    // Filter by brand
    if (filters.brand) {
        const brand = carBrands.find(b => b.id === filters.brand);
        if (brand) {
            filtered = filtered.filter(p =>
                p.carBrand.toLowerCase() === brand.name.toLowerCase()
            );
        }
    }

    // Filter by model
    if (filters.model) {
        const brand = carBrands.find(b => b.id === filters.brand);
        const model = brand?.models.find(m => m.id === filters.model);
        if (model) {
            filtered = filtered.filter(p =>
                p.carModel.toLowerCase() === model.name.toLowerCase()
            );
        }
    }

    // Sort
    switch (filters.sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name, 'th'));
            break;
        default:
            // Default: newest first
            filtered.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
    }

    return filtered;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams;
    const allProducts = await getProducts();
    const filteredProducts = filterProducts(allProducts, params);
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
                        พบ {filteredProducts.length} รายการ
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search & Filter */}
                <Suspense fallback={<div className="h-32 bg-white rounded-2xl animate-pulse" />}>
                    <SearchFilter />
                </Suspense>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                            ไม่พบสินค้า
                        </h2>
                        <p className="text-[var(--text-secondary)] mb-6">
                            ลองค้นหาด้วยคำอื่น หรือล้างตัวกรอง
                        </p>
                        <a
                            href="/products"
                            className="btn-primary inline-block"
                        >
                            ดูสินค้าทั้งหมด
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

// export const runtime = 'edge'
