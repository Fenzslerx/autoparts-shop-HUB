import Link from 'next/link'

export const metadata = {
    title: 'เกี่ยวกับเรา - MAVARIX',
    description: 'ศูนย์รวมอะไหล่รถยนต์มือสองคุณภาพดี คัดเกรด A จากเชียงกง พร้อมจัดส่งทั่วไทย',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Hero */}
            <section className="relative gradient-hero text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">เกี่ยวกับ MAVARIX</h1>
                    <p className="text-xl text-blue-100">ศูนย์รวมอะไหล่รถยนต์มือสองคุณภาพ ราคาประหยัด</p>
                </div>
            </section>

            {/* Story */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">เรื่องราวของเรา</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                                ช.โชคชัย เริ่มต้นจากความหลงใหลในรถยนต์และความต้องการช่วยเหลือคนรักรถให้ได้อะไหล่คุณภาพดีในราคาที่เข้าถึงได้
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                                เราคัดสรรอะไหล่ถอดเกรด A จากแหล่งคุณภาพ ตรวจสอบทุกชิ้นอย่างละเอียดก่อนส่งถึงมือลูกค้า มั่นใจได้ทั้งคุณภาพและความคุ้มค่า
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                ปัจจุบันเรามีสินค้ากว่า 1,000+ รายการ ครอบคลุมรถยนต์ยอดนิยมทุกยี่ห้อ พร้อมจัดส่งทั่วประเทศไทย
                            </p>
                        </div>
                        <div className="relative">
                            <img src="/uploads/shop-photo.jpg" alt="หน้าร้าน ช.โชคชัย" className="rounded-2xl shadow-xl" />
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-white font-bold text-center p-4 shadow-lg">
                                <span>10+ ปี<br />ประสบการณ์</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-[var(--background)]">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-12">ทำไมต้องเลือกเรา</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: '✅', title: 'คุณภาพเกรด A', desc: 'คัดสรรเฉพาะสินค้าสภาพดี ตรวจสอบก่อนส่ง' },
                            { icon: '💰', title: 'ราคายุติธรรม', desc: 'ถูกกว่าเบิกศูนย์ ประหยัดได้มาก' },
                            { icon: '🚚', title: 'จัดส่งทั่วไทย', desc: 'แพ็คอย่างดี ส่งถึงบ้านอย่างปลอดภัย' },
                            { icon: '💬', title: 'บริการดี', desc: 'ตอบไว ให้คำปรึกษาฟรี ไม่ซื้อไม่เป็นไร' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 text-center border border-[var(--border)] hover:shadow-lg transition-shadow">
                                <span className="text-4xl mb-4 block">{item.icon}</span>
                                <h3 className="font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-12">ติดต่อเรา</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold mb-2">ที่อยู่</h3>
                            <p className="text-[var(--text-secondary)] text-sm">กรุงเทพมหานคร</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="font-bold mb-2">โทรศัพท์</h3>
                            <p className="text-[var(--text-secondary)] text-sm">08X-XXX-XXXX</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#06C755]/10 flex items-center justify-center">
                                <svg className="w-8 h-8 text-[#06C755]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zM24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                            </div>
                            <h3 className="font-bold mb-2">LINE Official</h3>
                            <a href="https://line.me/R/oaMessage/@mavarix" target="_blank" className="text-[#06C755] font-medium hover:underline">@mavarix</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 gradient-hero text-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">พร้อมเลือกซื้ออะไหล่?</h2>
                    <p className="text-blue-100 mb-8">เลือกชมสินค้าคุณภาพหลากหลายรายการ หรือทักแชทสอบถามได้เลย!</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products" className="btn-primary bg-white text-blue-900 hover:bg-blue-50">
                            🛒 ดูสินค้าทั้งหมด
                        </Link>
                        <a href="https://line.me/R/oaMessage/@mavarix" target="_blank" className="btn-line">
                            💬 ติดต่อทาง LINE
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
