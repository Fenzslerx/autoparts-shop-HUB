import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import HomeSearch from '@/components/home/HomeSearch';
import HeroSection from '@/components/home/HeroSection';
import FacebookFeedSection from '@/components/home/FacebookFeedSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import { getProducts } from '@/lib/db';

export const revalidate = 0;

export default async function HomePage() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="bg-[var(--background)]">
      <HeroSection />

      <div className="relative z-20 -mt-5 px-4">
        <HomeSearch />
      </div>

      <section className="bg-[var(--background)] py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-3 flex items-center gap-3 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                <span className="h-8 w-1.5 rounded-full bg-[var(--primary)]"></span>
                สินค้าแนะนำ
              </h2>
              <p className="pl-5 text-base text-[var(--text-secondary)] md:text-lg">
                อะไหล่คุณภาพที่ค้นหาง่าย ดูไว และพร้อมต่อไปยังหน้ารายละเอียดได้ทันที
              </p>
            </div>

            <Link
              href="/products"
              className="group hidden items-center gap-2 font-semibold text-[var(--primary)] transition-all hover:gap-4 md:inline-flex"
            >
              ดูทั้งหมด
              <span className="rounded-full bg-blue-50 p-1 transition-colors group-hover:bg-blue-100">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="btn-primary w-full py-3 text-sm">
              ดูสินค้าทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      <FacebookFeedSection />
      <WhyChooseUsSection />
    </div>
  );
}
