import Link from 'next/link';
import Image from 'next/image';

export default function BuyWreckPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] pt-20">
            {/* Hero Banner */}
            <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/images/buy-wreck-promo.jpg')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="inline-block py-2 px-4 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold mb-4 border border-yellow-500/30 backdrop-blur-md">
                        รับซื้อซากรถทุกสภาพ
                    </span>
                    <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        เปลี่ยนซากรถเป็นเงินสด <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">ให้ราคาดีที่สุด</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                        รับซื้อรถเก่า รถเสีย รถชน รถจอดนาน ทุกสภาพ ไม่จำกัดรุ่น ยี่ห้อ <br className="hidden md:block" />
                        ประเมินราคาฟรี จ่ายเงินสดหน้างาน พร้อมบริการยกรถฟรีทั่วไทย
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://line.me/ti/p/~0972549395"
                            target="_blank"
                            className="btn-primary bg-[#06C755] hover:bg-[#05B04A] text-white border-none shadow-lg shadow-green-500/30 text-lg px-8 py-4"
                        >
                            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            ประเมินราคาฟรีทางไลน์
                        </a>
                        <a
                            href="tel:0972549395"
                            className="btn-primary bg-white text-gray-900 hover:bg-gray-100 hover:text-black border-none text-lg px-8 py-4"
                        >
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            โทร 097-254-9395
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:translate-y-[-5px] transition-transform duration-300">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto">
                            🚗
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">รับทุกสภาพ</h3>
                        <p className="text-[var(--text-secondary)]">รถเก๋ง กระบะ รถตู้ รถบรรทุก รับซื้อทุกรุ่น ทุกยี่ห้อ ไม่เกี่ยงสภาพ</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:translate-y-[-5px] transition-transform duration-300">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto">
                            💥
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">รถชนหนัก</h3>
                        <p className="text-[var(--text-secondary)]">รถเกิดอุบัติเหตุ ซ่อมไม่คุ้ม จอดทิ้งไว้นาน เราให้ราคาสูงที่สุด</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:translate-y-[-5px] transition-transform duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto">
                            💰
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">จ่ายเงินสด</h3>
                        <p className="text-[var(--text-secondary)]">ตกลงราคาได้ จ่ายเงินสดทันทีหน้างาน หรือโอนเข้าบัญชีรวดเร็ว</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:translate-y-[-5px] transition-transform duration-300">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto">
                            🚚
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">บริการรถยกฟรี</h3>
                        <p className="text-[var(--text-secondary)]">มีทีมงานพร้อมรถยกไปรับถึงที่ ทั่วไทย ไม่มีค่าใช้จ่ายแอบแฝง</p>
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-16">3 ขั้นตอนง่ายๆ ในการขายรถ</h2>
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 -translate-y-1/2"></div>

                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl border-4 border-white">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-2">ส่งรูปประเมินราคา</h3>
                            <p className="text-gray-600">แอดไลน์ ส่งรูปรถรอบคัน และรายละเอียดเบื้องต้น</p>
                        </div>
                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl border-4 border-white">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-2">นัดดูหน้างาน</h3>
                            <p className="text-gray-600">นัดวันเวลา สถานที่ เพื่อให้ทีมงานเข้าไปดูสภาพรถจริง</p>
                        </div>
                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl border-4 border-white">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-2">รับเงินทันที</h3>
                            <p className="text-gray-600">ตกลงราคา ทำสัญญาซื้อขาย จ่ายเงินสดและยกรถกลับทันที</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-12 md:py-20 bg-gray-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/images/cash-for-car.png')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">อย่าปล่อยให้รถเก่าไร้ค่า เปลี่ยนเป็นเงินก้อนวันนี้!</h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="https://line.me/ti/p/~0972549395"
                            target="_blank"
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] hover:bg-[#05B04A] text-white rounded-2xl font-bold text-xl shadow-lg shadow-green-500/30 hover:scale-105 transition-all w-full sm:w-auto"
                        >
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            <span>ทักไลน์ประเมินราคา</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
