'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const runtime = 'edge'

export default function AdminLoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await res.json()

            if (data.success) {
                router.push('/admin')
                router.refresh()
            } else {
                setError(data.message || 'Login failed')
            }
        } catch {
            setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-[var(--border)]">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-4">
                            <span className="text-white font-bold text-3xl">M</span>
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">MAVARIX Admin</h1>
                        <p className="text-[var(--text-secondary)] mt-2">เข้าสู่ระบบเพื่อจัดการสินค้า</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                ชื่อผู้ใช้
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field"
                                placeholder="admin"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                รหัสผ่าน
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary py-4 text-lg disabled:opacity-50"
                        >
                            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm text-blue-700">
                            <strong>Demo Login:</strong><br />
                            Username: <code className="bg-blue-100 px-1 rounded">admin</code><br />
                            Password: <code className="bg-blue-100 px-1 rounded">mavarix123</code>
                        </p>
                    </div>

                    {/* Back Link */}
                    <div className="mt-6 text-center">
                        <a href="/" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                            ← กลับหน้าหลัก
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const runtime = 'edge'
