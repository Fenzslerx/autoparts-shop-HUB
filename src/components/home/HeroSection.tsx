import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero text-white pb-10 pt-6 lg:pt-0">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[420px] w-[420px] rounded-full bg-blue-400 blur-[110px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[520px] w-[520px] rounded-full bg-indigo-600 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-8 lg:py-16">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md shadow-lg">
            <span className="h-2 w-2 rounded-full bg-[var(--secondary)]" />
            ร้านอะไหล่รถมือสอง พร้อมส่งทั่วไทย
          </div>

          <h1 className="text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            ช.โชคชัยรถยก
            <span className="mt-1 block text-blue-200">รถสไลด์</span>
            <span className="text-[var(--secondary)]">อะไหล่มือสอง</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100/90 lg:mx-0 lg:text-lg">
            ค้นหาอะไหล่ได้ง่าย ดูโพสต์ล่าสุดของร้านได้จากหน้าเว็บ และติดต่อซื้อขายต่อได้ทันทีผ่าน Facebook หรือ LINE
          </p>

          <div className="mt-7 grid grid-cols-3 gap-3 text-left">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="text-lg font-bold text-white">พร้อมส่ง</p>
              <p className="mt-1 text-sm text-blue-100/80">เช็กของได้ไว</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="text-lg font-bold text-white">ตอบเร็ว</p>
              <p className="mt-1 text-sm text-blue-100/80">คุยต่อผ่าน LINE</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
              <p className="text-lg font-bold text-white">ใช้งานง่าย</p>
              <p className="mt-1 text-sm text-blue-100/80">ค้นหาได้ทันที</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="https://www.facebook.com/chokhchay.xahil.kea?locale=th_TH"
              target="_blank"
              rel="noreferrer"
              className="btn-primary border-2 border-transparent bg-white text-blue-700 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-800"
            >
              Facebook ร้าน
            </a>
            <a
              href="https://line.me/ti/p/~0972549395"
              target="_blank"
              rel="noreferrer"
              className="btn-line shadow-lg shadow-green-900/20"
            >
              สอบถามผ่าน LINE
            </a>
          </div>
        </div>

        <div className="mt-4 lg:mt-0">
          <Link
            href="/services/buy-wreck"
            className="group relative mx-auto block aspect-[0.9] w-full max-w-md overflow-hidden rounded-[2rem] border-4 border-white/20 bg-gray-900 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-[url('/images/buy-wreck-promo.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-6 md:p-7">
              <div className="mb-auto">
                <span className="inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  HOT DEAL
                </span>
              </div>

              <h3 className="text-2xl font-extrabold leading-tight text-white md:text-[2rem]">
                รับซื้อซากรถ
                <span className="mt-1 block text-yellow-400">ให้ราคาดีที่สุด</span>
              </h3>

              <div className="mb-5 mt-4 space-y-2 text-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>รถชนหนัก หรือจอดทิ้งนาน</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>ประเมินราคาได้รวดเร็ว</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md transition-colors group-hover:bg-white/20">
                <span className="text-sm font-semibold text-white">คลิกเพื่อประเมินราคา</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-black transition-transform group-hover:translate-x-1">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 translate-y-1">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 50L60 45C120 40 240 30 360 30C480 30 600 40 720 50C840 60 960 70 1080 65C1200 60 1320 40 1380 30L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}
