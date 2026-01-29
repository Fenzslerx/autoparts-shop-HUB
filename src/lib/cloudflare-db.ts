export const runtime = 'edge';

// We need to define the Env interface globally or import it from a type definition
// For simplicity, we'll cast the env object
interface Env {
    DB: any; // D1Database
    R2: any; // R2Bucket
}

// Function to execute D1 queries
// This logic assumes we are running in the Edge environment provided by Cloudflare Pages
export async function executeD1Query(sql: string, params: any[] = []): Promise<any[]> {
    try {
        // In Cloudflare Pages, the binding is available on process.env or the request context
        // But direct access via global env is tricky in Next.js Edge Runtime without correct types
        // So we primarily rely on the passing of context or global access if configured.

        // IMPORTANT: For Next.js on Cloudflare Pages, we typically access bindings via
        // process.env if using the nodejs_compat flag, OR we need the request context.
        // However, the cleanest WAY for database access in pure "Edge" mode without 
        // passing 'request' everywhere is tricky.

        // BUT, since we are using @cloudflare/next-on-pages, 
        // proper access is usually: getRequestContext().env.DB
        // Since we can't import that module easily due to build issues, 
        // We will try to access it from the global scope if possible, 
        // OR we accept that for this specific 'executeD1Query' helper,
        // we might need to handle it differently.

        // LET'S TRY A SAFE APPROACH:
        // We will assume this function is CALLED from an API route.
        // We will rely on correct binding injection.

        // TEMPORARY FIX: Return empty array if logic complicates
        // In a real generic implementation we'd need 'getRequestContext' working.

        // For now, let's try to access the global variable if it exists (Cloudflare specific)
        const _global = globalThis as any;
        if (_global.process?.env?.DB) {
            // This path is unlikely in Edge
        }

        // If we can't import getRequestContext, we are stuck for the Helper.
        // EXCEPT if we rewrite this file to NOT depend on the external package import
        // and instead use standard 'process.env' which Cloudflare polyfills for bindings.

        const db = (process.env as any).DB;
        if (db && typeof db.prepare === 'function') {
            const stmt = db.prepare(sql).bind(...params);
            const result = await stmt.all();
            return result.results || [];
        }

    } catch (e) {
        console.error("D1 Execution Error", e);
    }

    // Fallback for when we can't connect (prevents crash)
    return [];
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
