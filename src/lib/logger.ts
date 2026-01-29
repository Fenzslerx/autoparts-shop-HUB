import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export type LogType = 'product' | 'auth' | 'visitor' | 'contact'
export type LogAction =
    | 'create' | 'update' | 'delete'  // product
    | 'login' | 'logout'              // auth
    | 'page_view'                     // visitor
    | 'inquiry'                       // contact

export interface LogEntry {
    id: string
    type: LogType
    action: LogAction
    timestamp: string
    data: Record<string, any>
    ip?: string
    userAgent?: string
}

const LOG_FILE = path.join(process.cwd(), 'data', 'logs.json')

async function ensureLogFile() {
    const dataDir = path.dirname(LOG_FILE)
    if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true })
    }
    if (!existsSync(LOG_FILE)) {
        await writeFile(LOG_FILE, JSON.stringify({ logs: [] }, null, 2), 'utf-8')
    }
}

export async function getLogs(options?: {
    type?: LogType
    limit?: number
    startDate?: string
    endDate?: string
}): Promise<LogEntry[]> {
    try {
        await ensureLogFile()
        const data = await readFile(LOG_FILE, 'utf-8')
        let logs: LogEntry[] = JSON.parse(data).logs || []

        // Filter by type
        if (options?.type) {
            logs = logs.filter(log => log.type === options.type)
        }

        // Filter by date range
        if (options?.startDate) {
            logs = logs.filter(log => log.timestamp >= options.startDate!)
        }
        if (options?.endDate) {
            logs = logs.filter(log => log.timestamp <= options.endDate!)
        }

        // Sort by newest first
        logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

        // Limit results
        if (options?.limit) {
            logs = logs.slice(0, options.limit)
        }

        return logs
    } catch (error) {
        console.error('Error reading logs:', error)
        return []
    }
}

export async function addLog(
    type: LogType,
    action: LogAction,
    data: Record<string, any>,
    request?: { ip?: string; userAgent?: string }
): Promise<LogEntry> {
    await ensureLogFile()

    const logEntry: LogEntry = {
        id: `log-${Date.now()}`,
        type,
        action,
        timestamp: new Date().toISOString(),
        data,
        ip: request?.ip,
        userAgent: request?.userAgent,
    }

    try {
        const fileData = await readFile(LOG_FILE, 'utf-8')
        const json = JSON.parse(fileData)
        json.logs = json.logs || []
        json.logs.push(logEntry)

        // Keep only last 1000 logs
        if (json.logs.length > 1000) {
            json.logs = json.logs.slice(-1000)
        }

        await writeFile(LOG_FILE, JSON.stringify(json, null, 2), 'utf-8')
    } catch (error) {
        console.error('Error writing log:', error)
    }

    return logEntry
}

// Helper functions
export async function logProductAction(
    action: 'create' | 'update' | 'delete',
    productData: { id?: string; name?: string;[key: string]: any }
) {
    return addLog('product', action, productData)
}

export async function logAuth(action: 'login' | 'logout', username: string, ip?: string) {
    return addLog('auth', action, { username }, { ip })
}

export async function logVisitor(
    page: string,
    productId?: string,
    request?: { ip?: string; userAgent?: string }
) {
    return addLog('visitor', 'page_view', { page, productId }, request)
}

export async function logContact(
    productId: string,
    productName: string,
    request?: { ip?: string; userAgent?: string }
) {
    return addLog('contact', 'inquiry', { productId, productName }, request)
}

// Get log stats
export async function getLogStats() {
    const logs = await getLogs()
    const today = new Date().toISOString().split('T')[0]

    return {
        totalLogs: logs.length,
        todayLogs: logs.filter(l => l.timestamp.startsWith(today)).length,
        productActions: logs.filter(l => l.type === 'product').length,
        authActions: logs.filter(l => l.type === 'auth').length,
        pageViews: logs.filter(l => l.type === 'visitor').length,
        inquiries: logs.filter(l => l.type === 'contact').length,
    }
}
