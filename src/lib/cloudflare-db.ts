export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

// We need to define the Env interface globally or import it from a type definition
interface Env {
    DB: D1Database;
    R2: R2Bucket;
}

// Function to execute D1 queries
export async function executeD1Query(sql: string, params: any[] = []): Promise<any[]> {
    try {
        // Access binding securely via getRequestContext
        const { env } = getRequestContext();
        const db = env.DB;

        if (!db) {
            console.error('DB binding not found in request context');
            // Fallback for local dev if bound via other means, or return empty to prevent crash
            // Try global as last resort fallback (sometimes useful in specific dev setups)
            const _global = globalThis as any;
            if (_global.process?.env?.DB && typeof _global.process.env.DB.prepare === 'function') {
                return await runQuery(_global.process.env.DB, sql, params);
            }
            return [];
        }

        return await runQuery(db, sql, params);

    } catch (e) {
        console.error("D1 Execution Error", e);
        return [];
    }
}

async function runQuery(db: D1Database, sql: string, params: any[]): Promise<any[]> {
    try {
        const stmt = db.prepare(sql).bind(...params);
        const result = await stmt.all();
        return result.results || [];
    } catch (e) {
        console.error("Query Error", e);
        throw e;
    }
}

// Get all products
export async function getProductsFromD1() {
    return await executeD1Query('SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC');
}

// Add product
export async function addProductToD1(product: any) {
    const id = `prod-${Date.now()}`;
    const now = new Date().toISOString();

    await executeD1Query(`
    INSERT INTO products (id, name, description, price, car_brand, car_model, car_year, category, image_url, stock, is_active, created_at, updated_at)
    VALUES ('${id}', '${product.name}', '${product.description || ''}', ${product.price}, '${product.carBrand}', '${product.carModel}', '${product.carYear || ''}', '${product.category}', '${product.imageUrl || ''}', ${product.stock || 0}, 1, '${now}', '${now}')
  `);

    return { ...product, id, isActive: true, createdAt: now, updatedAt: now };
}
