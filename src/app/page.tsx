import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import HomeSearch from '@/components/HomeSearch';

import { carBrands } from '@/lib/data';
import { getProducts } from '@/lib/db';

// Disable all caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  // Get featured products (first 4)
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden pb-12 pt-8 lg:pt-0">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Content Left (Text) - Shows FIRST on mobile now */}
            <div className="animate-fade-in text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-8 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse"></span>
                ศูนย์รวมอะไหล่รถยนต์มือสอง ราคาถูก
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                อะไหล่รถยนต์
                <span className="block text-blue-200">
                  มือสองคุณภาพ
                </span>
                <span className="text-[var(--secondary)]">ราคาประหยัด</span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                อะไหล่แท้ถอด คัดเกรด A จากเชียงกง มีครบทุกรุ่น Toyota, Honda, Isuzu รับประกันคุณภาพ พร้อมจัดส่งทั่วไทย
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="btn-primary bg-white text-blue-900 hover:bg-blue-50 hover:text-blue-800 border-2 border-transparent hover:border-blue-100"
                >
                  <span className="mr-2">🛒</span> เลือกซื้อสินค้า
                </Link>
                <a
                  href="https://line.me/R/oaMessage/@mavarix"
                  target="_blank"
                  className="btn-line shadow-lg shadow-green-900/20"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  สั่งซื้อทาง LINE
                </a>
              </div>
            </div>

            {/* Content Right (Image) - Shows SECOND on mobile */}
            <div className="relative animate-slide-up mt-8 lg:mt-0">
              <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-lg mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                {/* Glassmorphic Backing */}
                <div className="absolute inset-0 bg-white/10 rounded-[2rem] rotate-3 blur-sm"></div>

                {/* Main Image Container */}
                <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20">
                  <img
                    src="/uploads/shop-photo.jpg"
                    alt="หน้าร้าน ช.โชคชัย"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Shop Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-left">
                    <div className="glass-card inline-block px-4 py-1 mb-2 rounded-full border-none bg-white/20 backdrop-blur-md">
                      <span className="text-xs font-semibold text-white tracking-wider uppercase">Verified Seller</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">ช.โชคชัย</h3>
                    <p className="text-white/80 font-medium text-sm md:text-base">อะไหล่รถยนต์มือสอง คุณภาพเยี่ยม</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce hidden sm:flex">
                  <span className="text-white font-bold text-center text-xs leading-none transform -rotate-12">
                    ของดี<br />ราคาถูก<br /><span className="text-lg">💰</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 50L60 45C120 40 240 30 360 30C480 30 600 40 720 50C840 60 960 70 1080 65C1200 60 1320 40 1380 30L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="var(--background)" />
          </svg>
        </div>
      </section>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link
              href="/products"
              className="btn-primary w-full sm:w-auto"
            >
              ดูสินค้าทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white relative overflow-hidden">

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm mb-2 block">Why Choose MAVARIX</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              ทำไมต้องเลือกเรา?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              เราใส่ใจในทุกรายละเอียด เพื่อให้คุณได้รับอะไหล่ที่ดีที่สุด ในราคาที่คุ้มค่าที่สุด
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary-light)] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 text-center">สินค้าคุณภาพ</h3>
              <p className="text-[var(--text-secondary)] text-center leading-relaxed">
                คัดเกรด A จากแหล่งคุณภาพ เราตรวจสอบสินค้าทุกชิ้นก่อนส่งถึงมือคุณ มั่นใจได้ในความสวยและทนทาน
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--secondary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 text-center">ราคายุติธรรม</h3>
              <p className="text-[var(--text-secondary)] text-center leading-relaxed">
                เราเข้าใจคนรักรถ อะไหล่ทุกชิ้นตั้งราคาอย่างสมเหตุสมผล ถูกกว่าเบิกศูนย์ ช่วยคุณประหยัดงบ
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-[var(--background)] border border-[var(--border)] hover:border-[#06C755] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#06C755] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 text-center">ง่ายและรวดเร็ว</h3>
              <p className="text-[var(--text-secondary)] text-center leading-relaxed">
                ทัก LINE ปุ๊บ ตอบปั๊บ ให้คำปรึกษาฟรี ไม่ซื้อไม่เป็นไร ทีมงานเราพร้อมบริการด้วยความจริงใจ
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
