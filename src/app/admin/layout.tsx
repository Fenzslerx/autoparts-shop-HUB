import { redirect } from "next/navigation"
import Link from "next/link"
import { isAuthenticated } from "@/lib/auth"
import LogoutButton from "@/components/auth/LogoutButton"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const isAuth = await isAuthenticated()

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Admin Header - only show when authenticated */}
            {isAuth && (
                <header className="bg-white border-b border-[var(--border)] sticky top-16 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Desktop & Mobile Header */}
                        <div className="flex items-center justify-between h-14">
                            <span className="font-semibold text-[var(--primary)] whitespace-nowrap">🛠️ Admin</span>

                            {/* Navigation - visible on all screens */}
                            <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
                                <Link
                                    href="/admin"
                                    className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors px-2 py-1 whitespace-nowrap"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/products"
                                    className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors px-2 py-1 whitespace-nowrap"
                                >
                                    จัดการสินค้า
                                </Link>
                                <Link
                                    href="/admin/logs"
                                    className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors px-2 py-1 whitespace-nowrap"
                                >
                                    Logs
                                </Link>
                            </nav>

                            <LogoutButton />
                        </div>
                    </div>
                </header>
            )}

            {children}
        </div>
    )
}
