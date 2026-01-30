import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[var(--text-primary)] text-white" id="contact">
            {/* Contact Section - Integrated */}
            <div className="bg-gradient-to-b from-[var(--primary)] to-[var(--text-primary)] py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">ติดต่อเรา</h2>
                        <p className="text-white/80 text-sm sm:text-base">มีคำถาม? ติดต่อได้เลย!</p>
                    </div>

                    {/* Contact Cards - Mobile Optimized */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {/* LINE */}
                        <a
                            href="https://line.me/R/oaMessage/@mavarix"
                            target="_blank"
                            className="flex flex-col items-center p-4 sm:p-6 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--line-green)] flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                            </div>
                            <span className="font-semibold text-sm sm:text-base">LINE</span>
                            <span className="text-xs sm:text-sm text-white/80">@mavarix</span>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:02-XXX-XXXX"
                            className="flex flex-col items-center p-4 sm:p-6 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-sm sm:text-base">โทร</span>
                            <span className="text-xs sm:text-sm text-white/80">02-XXX-XXXX</span>
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:contact@mavarix.com"
                            className="flex flex-col items-center p-4 sm:p-6 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-500 flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-sm sm:text-base">อีเมล</span>
                            <span className="text-xs sm:text-sm text-white/80 truncate">contact@mavarix.com</span>
                        </a>

                        {/* Location */}
                        <div className="flex flex-col items-center p-4 sm:p-6 bg-white/10 backdrop-blur rounded-xl">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-500 flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-sm sm:text-base">ที่ตั้ง</span>
                            <span className="text-xs sm:text-sm text-white/80">กรุงเทพฯ</span>
                        </div>
                    </div>

                    {/* Business Hours - Compact */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-white/80">
                            ⏰ จันทร์-เสาร์ 09:00-18:00 | อาทิตย์หยุด
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
                    {/* Brand */}
                    <div className="col-span-2 sm:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                                <span className="text-[var(--primary)] font-bold text-lg">M</span>
                            </div>
                            <span className="text-xl font-bold">MAVARIX</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            ศูนย์รวมอะไหล่รถยนต์คุณภาพสูง ราคาย่อมเยา
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a
                                href="https://line.me/R/oaMessage/@mavarix"
                                target="_blank"
                                className="w-9 h-9 rounded-full bg-[var(--line-green)] flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-3 text-sm sm:text-base">หมวดหมู่</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products?category=engine" className="text-gray-400 hover:text-white">เครื่องยนต์</Link></li>
                            <li><Link href="/products?category=electrical" className="text-gray-400 hover:text-white">ระบบไฟฟ้า</Link></li>
                            <li><Link href="/products?category=brake" className="text-gray-400 hover:text-white">ระบบเบรค</Link></li>
                            <li><Link href="/products?category=suspension" className="text-gray-400 hover:text-white">ช่วงล่าง</Link></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-3 text-sm sm:text-base">ลิงก์</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-gray-400 hover:text-white">หน้าแรก</Link></li>
                            <li><Link href="/products" className="text-gray-400 hover:text-white">สินค้าทั้งหมด</Link></li>
                            <li><Link href="/admin/login" className="text-gray-400 hover:text-white">Admin</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                    <p>© 2024 MAVARIX. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
