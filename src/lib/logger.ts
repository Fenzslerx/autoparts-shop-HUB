import { executeD1Query } from './cloudflare-db'

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

export async function addLog(
    type: LogType,
    action: LogAction,
    data: Record<string, any>,
    request?: { ip?: string; userAgent?: string }
): Promise<LogEntry> {
    const id = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    try {
        await executeD1Query(`
        INSERT INTO logs (id, type, action, data, ip, user_agent, created_at)
        VALUES ('${id}', '${type}', '${action}', '${JSON.stringify(data).replace(/'/g, "''")}', '${request?.ip || ''}', '${request?.userAgent || ''}', '${now}')
      `)
    } catch (e) {
        console.error("Log error", e);
    }

    return {
        id,
        type,
        action,
        timestamp: now,
        data,
        ip: request?.ip,
        userAgent: request?.userAgent,
    }
}

export async function getLogs(options?: {
    type?: LogType
    limit?: number
    startDate?: string
    endDate?: string
}): Promise<LogEntry[]> {
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
    return {
        totalLogs: 0, todayLogs: 0, productActions: 0, authActions: 0, pageViews: 0, inquiries: 0
    }
}
