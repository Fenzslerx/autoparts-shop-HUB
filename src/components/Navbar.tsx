'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                            <span className="text-white font-bold text-xl drop-shadow-md">ช</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-[var(--primary)] leading-none group-hover:text-blue-700 transition-colors">
                                ช.โชคชัย
                            </span>
                            <span className="text-xs text-[var(--text-secondary)] font-medium tracking-wide">
                                อะไหล่รถยนต์มือสอง
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation (Shows on LG screens and up) */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium relative group"
                        >
                            หน้าแรก
                            <span className="absolute inset-x-0 bottom-[-4px] h-0.5 bg-[var(--primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </Link>
                        <Link
                            href="/products"
                            className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium relative group"
                        >
                            สินค้าทั้งหมด
                            <span className="absolute inset-x-0 bottom-[-4px] h-0.5 bg-[var(--primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </Link>

                        {/* Categories Dropdown */}
                        <div className="relative group">
                            <button
                                className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium group"
                            >
                                หมวดหมู่สินค้า
                                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                                <div className="p-2 space-y-1">
                                    <Link href="/products?category=engine" className="block px-4 py-3 hover:bg-blue-50/50 rounded-xl text-sm text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                                        ⚙️ เครื่องยนต์
                                    </Link>
                                    <Link href="/products?category=electrical" className="block px-4 py-3 hover:bg-blue-50/50 rounded-xl text-sm text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                                        ⚡️ ระบบไฟฟ้า
                                    </Link>
                                    <Link href="/products?category=suspension" className="block px-4 py-3 hover:bg-blue-50/50 rounded-xl text-sm text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                                        🔧 ช่วงล่าง
                                    </Link>
                                    <Link href="/products?category=brake" className="block px-4 py-3 hover:bg-blue-50/50 rounded-xl text-sm text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                                        🛑 ระบบเบรค
                                    </Link>
                                    <Link href="/products?category=body" className="block px-4 py-3 hover:bg-blue-50/50 rounded-xl text-sm text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                                        🚗 ตัวถัง
                                    </Link>
                                    <Link href="/products?category=interior" className="block px-4 py-3 hover:bg-blue-50/50 rounded-xl text-sm text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                                        💺 ภายใน
                                    </Link>
                                    <Link href="/products?category=cooling" className="block px-4 py-3 hover:bg-blue-50/50 rounded-xl text-sm text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                                        ❄️ ระบบระบายความร้อน
                                    </Link>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <Link href="/products" className="block px-4 py-2 text-center text-sm text-[var(--primary)] font-semibold hover:bg-blue-50 rounded-xl transition-colors">
                                        ดูทั้งหมด
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Button (Desktop) */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/admin/login"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-500 font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-blue-50 transition-all text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Admin</span>
                        </Link>
                        <Link
                            href="https://line.me/R/oaMessage/@mavarix"
                            target="_blank"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#06C755] text-white font-bold hover:bg-[#05B04A] transition-all hover:scale-105 shadow-lg shadow-green-500/20"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            <span>ติดต่อเรา</span>
                        </Link>
                    </div>

                    {/* Mobile menu button (Shows on smaller screens including iPad) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`
                    lg:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl transition-all duration-300 ease-in-out transform origin-top
                    ${isMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}
                `}>
                    <div className="container mx-auto px-4 py-6 flex flex-col gap-2 max-h-[85vh] overflow-y-auto">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-[var(--primary)] font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="text-xl">🏠</span> หน้าแรก
                        </Link>
                        <Link
                            href="/products"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-[var(--primary)] font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="text-xl">📦</span> สินค้าทั้งหมด
                        </Link>

                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">หมวดหมู่สินค้า</div>

                        <div className="grid grid-cols-2 gap-2 pl-4">
                            <Link href="/products?category=engine" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[var(--primary)]">
                                ⚙️ เครื่องยนต์
                            </Link>
                            <Link href="/products?category=electrical" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[var(--primary)]">
                                ⚡️ ระบบไฟฟ้า
                            </Link>
                            <Link href="/products?category=suspension" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[var(--primary)]">
                                🔧 ช่วงล่าง
                            </Link>
                            <Link href="/products?category=brake" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[var(--primary)]">
                                🛑 ระบบเบรค
                            </Link>
                            <Link href="/products?category=body" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[var(--primary)]">
                                🚗 ตัวถัง
                            </Link>
                            <Link href="/products?category=interior" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[var(--primary)]">
                                💺 ภายใน
                            </Link>
                            <Link href="/products?category=cooling" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[var(--primary)]">
                                ❄️ ระบายความร้อน
                            </Link>
                        </div>

                        <div className="h-px bg-gray-100 my-2"></div>

                        {/* Mobile Actions */}
                        <Link
                            href="https://line.me/R/oaMessage/@mavarix"
                            target="_blank"
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#06C755] text-white font-bold shadow-lg shadow-green-500/30 active:scale-95 transition-transform"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            <span>ติดต่อเราทาง LINE</span>
                        </Link>
                        <Link
                            href="/admin/login"
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-500 font-medium hover:bg-gray-50 transition-all text-sm"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>Admin Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
