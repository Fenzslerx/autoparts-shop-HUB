import { executeD1Query } from './cloudflare-db'
import { isD1Configured, isSupabaseConfigured } from './env'
import { readLocalLogs, writeLocalLogs } from './local-store'
import { addLogToSupabase, getLogsFromSupabase } from './supabase-db'

export type LogType = 'product' | 'auth' | 'visitor' | 'contact'
export type LogAction =
    | 'create'
    | 'update'
    | 'delete'
    | 'login'
    | 'login_failed'
    | 'login_rate_limited'
    | 'logout'
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

export async function addLog(
    type: LogType,
    action: LogAction,
    data: Record<string, any>,
    request?: { ip?: string; userAgent?: string },
): Promise<LogEntry> {
    const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
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

    if (isSupabaseConfigured()) {
        try {
            await addLogToSupabase(logEntry)
            return logEntry
        } catch (error) {
            console.error('Supabase log error', error)
        }
    }

    if (isD1Configured()) {
        try {
            await executeD1Query(
                `
            INSERT INTO logs (id, type, action, data, ip, user_agent, created_at)
            VALUES ('${id}', '${type}', '${action}', '${JSON.stringify(data).replace(/'/g, "''")}', '${request?.ip || ''}', '${request?.userAgent || ''}', '${now}')
          `,
            )
            return logEntry
        } catch (error) {
            console.error('D1 log error', error)
        }
    }

    const logs = await readLocalLogs()
    logs.unshift(logEntry)
    if (logs.length > 1000) logs.length = 1000
    await writeLocalLogs(logs)
    return logEntry
}

export async function getLogs(options?: {
    type?: LogType
    limit?: number
    startDate?: string
    endDate?: string
}): Promise<LogEntry[]> {
    if (isSupabaseConfigured()) {
        try {
            return await getLogsFromSupabase(options)
        } catch (error) {
            console.error('Supabase getLogs error', error)
        }
    }

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
            userAgent: row.user_agent,
        }))
    }

    let logs = await readLocalLogs()
    if (options?.type) logs = logs.filter((l) => l.type === options.type)
    if (options?.startDate) logs = logs.filter((l) => l.timestamp >= options.startDate!)
    if (options?.endDate) logs = logs.filter((l) => l.timestamp <= options.endDate!)
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    if (options?.limit) logs = logs.slice(0, options.limit)
    return logs
}

export async function logProductAction(action: LogAction, productData: Record<string, any>) {
    return addLog('product', action, productData)
}

export async function logAuth(action: LogAction, username: string, ip?: string) {
    return addLog('auth', action, { username }, { ip })
}

export async function logVisitor(page: string, productId?: string, request?: { ip?: string; userAgent?: string }) {
    return addLog('visitor', 'page_view', { page, productId }, request)
}

export async function logContact(productId: string, productName: string, request?: { ip?: string; userAgent?: string }) {
    return addLog('contact', 'inquiry', { productId, productName }, request)
}

export async function getLogStats() {
    const logs = await getLogs({ limit: 1000 })
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

    return {
        totalLogs: logs.length,
        todayLogs: logs.filter((l) => l.timestamp >= startOfDay).length,
        productActions: logs.filter((l) => l.type === 'product').length,
        authActions: logs.filter((l) => l.type === 'auth').length,
        pageViews: logs.filter((l) => l.type === 'visitor').length,
        inquiries: logs.filter((l) => l.type === 'contact').length,
    }
}
