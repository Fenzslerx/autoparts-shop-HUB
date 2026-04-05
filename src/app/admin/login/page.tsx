'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(true)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/check', { cache: 'no-store' })
                if (res.ok) {
                    const data = await res.json()
                    if (data.authenticated) {
                        router.replace('/admin')
                        return
                    }
                }
            } catch {}

            setIsChecking(false)
        }

        checkAuth()
    }, [router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password, rememberMe }),
                headers: { 'Content-Type': 'application/json' },
            })

            if (res.ok) {
                router.push('/admin')
                router.refresh()
            } else {
                setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
            }
        } catch {
            setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            setIsLoading(false)
        }
    }

    if (isChecking) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--primary)]" />
                    <p className="text-[var(--text-secondary)]">กำลังตรวจสอบสิทธิ์...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="relative hidden overflow-hidden lg:flex lg:w-1/2 gradient-hero">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-300 blur-3xl" />
                    <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 blur-3xl" />
                </div>

                <div className="relative z-10 flex w-full flex-col items-center justify-center px-12 text-white">
                    <div className="text-center">
                        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>

                        <h1 className="mb-4 text-4xl font-bold">ช.โชคชัยรถยก</h1>
                        <p className="mb-8 text-xl text-gray-200">ระบบจัดการอะไหล่และสต็อกร้านแบบรวดเร็ว</p>

                        <div className="mt-12 grid grid-cols-3 gap-6">
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                                <div className="text-2xl font-bold text-[var(--secondary)]">500+</div>
                                <div className="text-sm text-gray-200">รายการสินค้า</div>
                            </div>
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                                <div className="text-2xl font-bold text-[var(--secondary)]">6</div>
                                <div className="text-sm text-gray-200">ยี่ห้อรถหลัก</div>
                            </div>
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                                <div className="text-2xl font-bold text-[var(--secondary)]">24/7</div>
                                <div className="text-sm text-gray-200">พร้อมใช้งาน</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center lg:hidden">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">ช.โชคชัยรถยก</h1>
                    </div>

                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="mb-2 text-3xl font-bold text-[var(--text-primary)]">เข้าสู่ระบบผู้ดูแล</h2>
                        <p className="text-[var(--text-secondary)]">ล็อกอินเพื่อจัดการสินค้า สต็อก และข้อมูลร้าน</p>
                    </div>

                    {error && (
                        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">ชื่อผู้ใช้</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full rounded-xl border-2 border-[var(--border)] bg-gray-50 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-[var(--primary)]/10"
                                    placeholder="กรอกชื่อผู้ใช้"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">รหัสผ่าน</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border-2 border-[var(--border)] bg-gray-50 py-3.5 pl-12 pr-12 outline-none transition-all focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-[var(--primary)]/10"
                                    placeholder="กรอกรหัสผ่าน"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <label htmlFor="rememberMe" className="cursor-pointer text-sm text-[var(--text-secondary)]">
                                จดจำการเข้าสู่ระบบไว้ 30 วัน
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl gradient-primary py-4 text-lg font-semibold text-white shadow-lg shadow-[var(--primary)]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/40 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    กำลังเข้าสู่ระบบ...
                                </>
                            ) : (
                                <>
                                    เข้าสู่ระบบ
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                        <Link href="/" className="font-medium text-[var(--primary)] hover:underline">
                            กลับไปหน้าเว็บไซต์
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
