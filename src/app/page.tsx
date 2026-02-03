import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import HomeSearch from '@/components/home/HomeSearch';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';


import { getProducts } from '@/lib/db';

// Disable all caching
// Enable caching with revalidation (every 60 seconds)
export const revalidate = 60;

export default async function HomePage() {
  // Get featured products (first 4)
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="bg-[var(--background)]">
      {/* Hero Section */}
      <HeroSection />

      {/* Search Section (Overlapping the wave) */}
      <div className="relative z-20 -mt-8 px-4">
        <HomeSearch />
      </div>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-[var(--primary)] rounded-full"></span>
                สินค้าแนะนำ
              </h2>
              <p className="text-[var(--text-secondary)] text-lg pl-5">
                อะไหล่คุณภาพที่ลูกค้าไว้วางใจ เลือกชมได้เลย
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:gap-4 transition-all group"
            >
              ดูทั้งหมด
              <span className="bg-blue-50 p-1 rounded-full group-hover:bg-blue-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12 md:hidden">
            <Link
              href="/products"
              className="btn-primary w-full text-sm py-3"
            >
              ดูสินค้าทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      {/* Buy Car Wreck Section */}


      {/* Why Choose Us */}
      <WhyChooseUsSection />

    </div>
  );
}
