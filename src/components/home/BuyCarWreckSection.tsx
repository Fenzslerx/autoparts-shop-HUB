'use client';

export default function BuyCarWreckSection() {
    return (
        <section className="py-12 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden text-white">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[var(--primary)]/20 rounded-full blur-[80px] lg:blur-[120px] mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[250px] lg:w-[400px] h-[250px] lg:h-[400px] bg-purple-600/20 rounded-full blur-[60px] lg:blur-[100px] mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs lg:text-sm font-medium mb-6 backdrop-blur-md border border-white/10 text-[var(--secondary)]">
                            <span className="text-base lg:text-xl">💰</span> รับซื้อซากรถทุกชนิด
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
                            เปลี่ยนซากรถ
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-1 lg:mt-0">
                                เป็นเงินสดทันที
                            </span>
                        </h2>

                        <p className="text-base md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            รถเก่า รถเสีย รถชน หรือรถจอดนาน เราตียอดให้ราคาสูง!
                            <br className="hidden md:block" />
                            ประเมินราคาฟรีถึงที่ จ่ายเงินสดหน้างาน พร้อมบริการยกรถฟรีทั่วไทย
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start px-4 lg:px-0">
                            <a
                                href="https://line.me/ti/p/~0972549395"
                                target="_blank"
                                className="flex items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-[#06C755] hover:bg-[#05B04A] text-white rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg shadow-lg shadow-green-500/30 hover:scale-105 transition-all duration-300 group w-full sm:w-auto"
                            >
                                <svg className="w-6 h-6 lg:w-8 lg:h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                                <span>ทักไลน์ประเมินราคาฟรี</span>
                            </a>
                            <a
                                href="tel:0972549395"
                                className="flex items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl lg:rounded-2xl font-semibold text-base lg:text-lg backdrop-blur-md transition-all duration-300 w-full sm:w-auto"
                            >
                                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>097-254-9395</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="w-full lg:w-1/2 relative px-2 lg:px-0">
                        <div className="relative z-10 p-2 bg-gradient-to-br from-white/10 to-transparent rounded-3xl backdrop-blur-xl border border-white/10 w-full transform lg:rotate-2 lg:hover:rotate-0 transition-transform duration-500">
                            <div className="bg-gray-900/80 rounded-2xl p-6 lg:p-8 border border-white/5">
                                <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6">
                                    <div className="bg-white/5 p-3 lg:p-4 rounded-xl text-center">
                                        <div className="text-2xl lg:text-3xl mb-2">🚗</div>
                                        <div className="font-semibold text-white text-sm lg:text-base">รถเก๋ง / กระบะ</div>
                                        <div className="text-[10px] lg:text-xs text-green-400">รับทุกสภาพ</div>
                                    </div>
                                    <div className="bg-white/5 p-3 lg:p-4 rounded-xl text-center">
                                        <div className="text-2xl lg:text-3xl mb-2">💥</div>
                                        <div className="font-semibold text-white text-sm lg:text-base">รถชนหนัก</div>
                                        <div className="text-[10px] lg:text-xs text-green-400">ให้ราคาสูง</div>
                                    </div>
                                    <div className="bg-white/5 p-3 lg:p-4 rounded-xl text-center">
                                        <div className="text-2xl lg:text-3xl mb-2">🅿️</div>
                                        <div className="font-semibold text-white text-sm lg:text-base">รถจอดนาน</div>
                                        <div className="text-[10px] lg:text-xs text-green-400">ไม่มีเล่มก็รับ</div>
                                    </div>
                                    <div className="bg-white/5 p-3 lg:p-4 rounded-xl text-center">
                                        <div className="text-2xl lg:text-3xl mb-2">🔧</div>
                                        <div className="font-semibold text-white text-sm lg:text-base">ซากอะไหล่</div>
                                        <div className="text-[10px] lg:text-xs text-green-400">เหมาหมด</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0">✓</div>
                                        <span>จบงานไว จ่ายเงินสดทันที</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0">✓</div>
                                        <span>มีรถยกไปรับถึงที่ ฟรีไม่มีค่าใช้จ่าย</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0">✓</div>
                                        <span>คุยง่าย เป็นกันเอง ประเมินราคาฟรี</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decor */}
                        <div className="absolute -top-6 -right-4 lg:-top-10 lg:-right-10 text-7xl lg:text-9xl opacity-20 transform rotate-12 pointer-events-none">
                            🏗️
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
