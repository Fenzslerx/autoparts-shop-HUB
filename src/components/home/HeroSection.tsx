import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
    return (
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
                            ช.โชคชัยรถยก รถสไลด์ อะไหล่มือสอง
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                            ช.โชคชัยรถยก
                            <span className="block text-blue-200">
                                รถสไลด์
                            </span>
                            <span className="text-[var(--secondary)]">อะไหล่มือสอง</span>
                        </h1>

                        <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            บริการรถสไลด์ อะไหล่มือสอง ราคาถูก คุณภาพดี พร้อมส่งทั่วไทย
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="https://www.facebook.com/chokhchay.xahil.kea?locale=th_TH"
                                target="_blank"
                                className="btn-primary bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-800 border-2 border-transparent hover:border-blue-100 flex items-center gap-2"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">ช่องทางหลัก</span>
                            </a>
                            <a
                                href="https://line.me/ti/p/~0890071802"
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
                                <Image
                                    src="/uploads/shop-photo.jpg"
                                    alt="หน้าร้าน ช.โชคชัย"
                                    fill
                                    className="object-cover"
                                    priority
                                    quality={85}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* Shop Info Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-left">
                                    <div className="glass-card inline-block px-4 py-1 mb-2 rounded-full border-none bg-white/20 backdrop-blur-md">
                                        <span className="text-xs font-semibold text-white tracking-wider uppercase">Verified Seller</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">ช.โชคชัยรถยก</h3>
                                    <p className="text-white/80 font-medium text-sm md:text-base">รถสไลด์ อะไหล่มือสอง</p>
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
    );
}
