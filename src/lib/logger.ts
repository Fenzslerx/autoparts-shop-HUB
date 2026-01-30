import { executeD1Query } from './cloudflare-db'
import fs from 'fs'
import path from 'path'

export type LogType = 'product' | 'auth' | 'visitor' | 'contact'
export type LogAction =
    | 'create' | 'update' | 'delete'
    | 'login' | 'logout'
    | 'page_view'
    | 'inquiry'

export interface LogEntry {
    id: string
    type: LogType
    action: LogAction
    timestamp: string
    data: Record<string, any>
    ip?: string
    userAgent?: string
}

const LOCAL_LOG_FILE = path.join(process.cwd(), 'local-logs.json')

// Helper to check if D1 is configured
const isD1Configured = () => {
    return !!process.env.D1_DATABASE_ID && !!process.env.CLOUDFLARE_API_TOKEN
}

// Helper for local logs
const getLocalLogs = (): LogEntry[] => {
    try {
        if (fs.existsSync(LOCAL_LOG_FILE)) {
            const data = fs.readFileSync(LOCAL_LOG_FILE, 'utf-8')
            return JSON.parse(data)
        }
    } catch (e) {
        console.error('Error reading local logs:', e)
    }
    return []
}

const saveLocalLog = (log: LogEntry) => {
    try {
        const logs = getLocalLogs()
        logs.unshift(log) // Add to beginning
        // Keep only last 1000 logs locally to prevent file bloat
        if (logs.length > 1000) logs.length = 1000
        fs.writeFileSync(LOCAL_LOG_FILE, JSON.stringify(logs, null, 2))
    } catch (e) {
        console.error('Error writing local log:', e)
    }
}

export async function addLog(
    type: LogType,
    action: LogAction,
    data: Record<string, any>,
    request?: { ip?: string; userAgent?: string }
): Promise<LogEntry> {
    const id = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    const logEntry: LogEntry = {
        id,
        type,
        action,
        timestamp: now,
        data,
        ip: request?.ip,
        userAgent: request?.userAgent,
    }

    if (isD1Configured()) {
        try {
            await executeD1Query(`
            INSERT INTO logs (id, type, action, data, ip, user_agent, created_at)
            VALUES ('${id}', '${type}', '${action}', '${JSON.stringify(data).replace(/'/g, "''")}', '${request?.ip || ''}', '${request?.userAgent || ''}', '${now}')
          `)
        } catch (e) {
            console.error("Log error", e);
        }
    } else {
        // Fallback to local file
        saveLocalLog(logEntry)
    }

    return logEntry
}

export async function getLogs(options?: {
    type?: LogType
    limit?: number
    startDate?: string
    endDate?: string
}): Promise<LogEntry[]> {
    if (isD1Configured()) {
        let sql = 'SELECT * FROM logs WHERE 1=1'
        if (options?.type) sql += ` AND type = '${options.type}'`
        if (options?.startDate) sql += ` AND created_at >= '${options.startDate}'`
        if (options?.endDate) sql += ` AND created_at <= '${options.endDate}'`
        sql += ' ORDER BY created_at DESC'
        if (options?.limit) sql += ` LIMIT ${options.limit}`

        const results = await executeD1Query(sql)
        return results.map((row: any) => ({
            id: row.id,
            type: row.type,
            action: row.action,
            timestamp: row.created_at,
            data: JSON.parse(row.data || '{}'),
            ip: row.ip,
            userAgent: row.user_agent
        }))
    } else {
        // Local fallback
        let logs = getLocalLogs()

        if (options?.type) logs = logs.filter(l => l.type === options.type)
        if (options?.startDate) logs = logs.filter(l => l.timestamp >= options.startDate!)
        if (options?.endDate) logs = logs.filter(l => l.timestamp <= options.endDate!)

        // Sort by date desc (already assumed by unshift, but explicit sort is safer)
        logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

        if (options?.limit) logs = logs.slice(0, options.limit)

        return logs
    }
}

export async function logProductAction(action: any, productData: any) {
    return addLog('product', action, productData)
}

export async function logAuth(action: any, username: string, ip?: string) {
    return addLog('auth', action, { username }, { ip })
}

export async function logVisitor(page: string, productId?: string, request?: any) {
    return addLog('visitor', 'page_view', { page, productId }, request)
}

export async function logContact(productId: string, productName: string, request?: any) {
    return addLog('contact', 'inquiry', { productId, productName }, request)
}

export async function getLogStats() {
    if (isD1Configured()) {
        // This would require a separate query or aggregation which D1 supports but we'll stick to basic implementation
        // For now, return empty or implement a COUNT query if strictly needed
        return {
            totalLogs: 0, todayLogs: 0, productActions: 0, authActions: 0, pageViews: 0, inquiries: 0
        }
    } else {
        const logs = getLocalLogs()
        const now = new Date()
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

        return {
            totalLogs: logs.length,
            todayLogs: logs.filter(l => l.timestamp >= startOfDay).length,
            productActions: logs.filter(l => l.type === 'product').length,
            authActions: logs.filter(l => l.type === 'auth').length,
            pageViews: logs.filter(l => l.type === 'visitor').length,
            inquiries: logs.filter(l => l.type === 'contact').length,
        }
    }
}
