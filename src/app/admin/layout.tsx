import { redirect } from "next/navigation"
import Link from "next/link"
import { isAuthenticated } from "@/lib/auth"
import LogoutButton from "@/components/LogoutButton"

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
                        <div className="flex items-center justify-between h-14">
                            <div className="flex items-center gap-6">
                                <span className="font-semibold text-[var(--primary)]">🛠️ Admin Panel</span>
                                <nav className="hidden md:flex items-center gap-4">
                                    <Link
                                        href="/admin"
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/admin/products"
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                                    >
                                        จัดการสินค้า
                                    </Link>
                                    <Link
                                        href="/admin/logs"
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                                    >
                                        Logs
                                    </Link>
                                </nav>
                            </div>

                            <LogoutButton />
                        </div>
                    </div>
                </header>
            )}

            {children}
        </div>
    )
}
