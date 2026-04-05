'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/')
        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
            ออกจากระบบ
        </button>
    )
}
