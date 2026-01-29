'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogsDashboard() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('all')

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">
                บันทึกการใช้งาน (Logs)
            </h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['all', 'auth', 'product', 'visitor', 'contact'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${activeTab === tab
                                ? 'bg-[var(--primary)] text-white font-medium'
                                : 'bg-white text-[var(--text-secondary)] hover:bg-gray-50 border border-[var(--border)]'
                            }`}
                    >
                        {tab === 'all' && 'ทั้งหมด'}
                        {tab === 'auth' && 'การเข้าสู่ระบบ'}
                        {tab === 'product' && 'จัดการสินค้า'}
                        {tab === 'visitor' && 'ผู้เข้าชม'}
                        {tab === 'contact' && 'การติดต่อ'}
                    </button>
                ))}
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
                <LogTable type={activeTab === 'all' ? undefined : activeTab} />
            </div>
        </div>
    )
}

function LogTable({ type }: { type?: string }) {
    const [logs, setLogs] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchLogs() {
            setIsLoading(true)
            try {
                const url = type ? `/api/logs?type=${type}` : '/api/logs'
                const res = await fetch(url)
                const data = await res.json()
                setLogs(data.logs || [])
            } catch (error) {
                console.error('Error fetching logs:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchLogs()
    }, [type])

    if (isLoading) {
        return (
            <div className="p-16 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-[var(--text-secondary)]">กำลังโหลดข้อมูล...</p>
            </div>
        )
    }

    if (logs.length === 0) {
        return (
            <div className="p-16 text-center text-[var(--text-secondary)]">
                ไม่มีข้อมูลบันทึกในช่วงนี้
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-[var(--border)]">
                    <tr>
                        <th className="px-6 py-4 font-medium text-[var(--text-secondary)]">เวลา</th>
                        <th className="px-6 py-4 font-medium text-[var(--text-secondary)]">ประเภท</th>
                        <th className="px-6 py-4 font-medium text-[var(--text-secondary)]">การกระทำ</th>
                        <th className="px-6 py-4 font-medium text-[var(--text-secondary)]">รายละเอียด</th>
                        <th className="px-6 py-4 font-medium text-[var(--text-secondary)]">IP/User</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-[var(--text-secondary)] whitespace-nowrap">
                                {new Date(log.timestamp).toLocaleString('th-TH')}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${log.type === 'auth' ? 'bg-purple-100 text-purple-800' :
                                        log.type === 'product' ? 'bg-blue-100 text-blue-800' :
                                            log.type === 'visitor' ? 'bg-green-100 text-green-800' :
                                                'bg-orange-100 text-orange-800'
                                    }`}>
                                    {log.type === 'auth' && 'Authentication'}
                                    {log.type === 'product' && 'Product'}
                                    {log.type === 'visitor' && 'Visitor'}
                                    {log.type === 'contact' && 'Contact'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-[var(--text-primary)]">
                                {log.action}
                            </td>
                            <td className="px-6 py-4 text-sm text-[var(--text-secondary)] max-w-xs truncate">
                                {JSON.stringify(log.data)}
                            </td>
                            <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                                <div className="flex flex-col">
                                    <span>{log.ip || '-'}</span>
                                    <span className="text-xs opacity-70 truncate max-w-[150px]">{log.userAgent}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
