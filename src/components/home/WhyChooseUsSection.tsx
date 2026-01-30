export default function WhyChooseUsSection() {
    return (
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
    );
}
