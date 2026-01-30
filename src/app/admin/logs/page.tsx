'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function LogsDashboard() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('all')
    const [logs, setLogs] = useState([])
    const [stats, setStats] = useState({
        totalLogs: 0,
        todayLogs: 0,
        productActions: 0,
        authActions: 0,
        pageViews: 0,
        inquiries: 0,
    })
    const [loading, setLoading] = useState(true)

    const fetchLogs = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/logs?limit=100')
            if (res.ok) {
                const data = await res.json()
                setLogs(data)

                // Calculate stats client-side for immediate feedback
                const now = new Date()
                const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

                setStats({
                    totalLogs: data.length,
                    todayLogs: data.filter((l: any) => l.timestamp >= startOfDay).length,
                    productActions: data.filter((l: any) => l.type === 'product').length,
                    authActions: data.filter((l: any) => l.type === 'auth').length,
                    pageViews: data.filter((l: any) => l.type === 'visitor').length,
                    inquiries: data.filter((l: any) => l.type === 'contact').length,
                })
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLogs()
    }, [])

    const getActionColor = (type: string) => {
        switch (type) {
            case 'auth': return 'bg-red-100 text-red-700'
            case 'product': return 'bg-blue-100 text-blue-700'
            case 'contact': return 'bg-green-100 text-green-700'
            case 'visitor': return 'bg-gray-100 text-gray-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('th-TH')
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">System Logs</h1>
                    <p className="text-[var(--text-secondary)]">ติดตามการใช้งานและกิจกรรมในระบบ</p>
                </div>
                <button
                    onClick={fetchLogs}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Logs</p>
                    <p className="text-2xl font-bold">{stats.totalLogs}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Today</p>
                    <p className="text-2xl font-bold text-green-600">+{stats.todayLogs}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Page Views</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.pageViews}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Actions</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.productActions + stats.authActions}</p>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Loading logs...
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No logs found
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log: any) => (
                                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {formatDate(log.timestamp)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getActionColor(log.type)}`}>
                                                {log.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-[var(--text-primary)]">
                                            {log.action}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                            {JSON.stringify(log.data)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                                            {log.ip || '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
