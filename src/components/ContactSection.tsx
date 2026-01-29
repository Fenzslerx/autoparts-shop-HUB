export default function ContactSection() {
    return (
        <section className="py-16 bg-white" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        ติดต่อเรา
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        มีคำถามหรือต้องการสอบถามสินค้า ติดต่อเราได้เลย!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="bg-[var(--background)] rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">ข้อมูลการติดต่อ</h3>

                        <div className="space-y-6">
                            {/* LINE */}
                            <a
                                href="https://line.me/R/oaMessage/@mavarix"
                                target="_blank"
                                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[var(--line-green)] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-[var(--text-primary)]">LINE Official</p>
                                    <p className="text-[var(--line-green)]">@mavarix</p>
                                </div>
                            </a>

                            {/* Phone */}
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-[var(--text-primary)]">โทรศัพท์</p>
                                    <p className="text-[var(--text-secondary)]">02-XXX-XXXX</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-[var(--text-primary)]">อีเมล</p>
                                    <p className="text-[var(--text-secondary)]">contact@mavarix.com</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl">
                                <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-[var(--text-primary)]">ที่อยู่ร้าน</p>
                                    <p className="text-[var(--text-secondary)]">
                                        123/45 ถนนพระราม 4<br />
                                        แขวงคลองเตย เขตคลองเตย<br />
                                        กรุงเทพมหานคร 10110
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="mt-6 p-4 bg-white rounded-xl">
                            <p className="font-semibold text-[var(--text-primary)] mb-2">⏰ เวลาทำการ</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="text-[var(--text-secondary)]">จันทร์ - เสาร์:</span>
                                <span className="text-[var(--text-primary)]">09:00 - 18:00</span>
                                <span className="text-[var(--text-secondary)]">อาทิตย์:</span>
                                <span className="text-[var(--text-primary)]">หยุด</span>
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="rounded-2xl overflow-hidden shadow-lg h-[500px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5699!2d100.5697!3d13.7273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ed604c5e0c7%3A0x123456789!2z4LiW4LiZ4LiZ4Lie4Lij4Liw4Lij4Liy4LihIDQ!5e0!3m2!1sth!2sth!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="MAVARIX Location"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
