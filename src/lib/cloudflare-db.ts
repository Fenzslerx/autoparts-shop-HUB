import type { Product } from './types';

// D1 REST API configuration
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.R2_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const D1_DATABASE_ID = process.env.D1_DATABASE_ID;

interface D1Response {
    success: boolean;
    result: Array<{
        results: any[];
        success: boolean;
        meta?: any;
    }>;
    errors: any[];
}

// Escape string for SQL
function escapeSql(value: any): string {
    if (value === null || value === undefined) return 'NULL';
    if (typeof value === 'number') return String(value);
    if (typeof value === 'boolean') return value ? '1' : '0';
    // Escape single quotes by doubling them
    return `'${String(value).replace(/'/g, "''")}'`;
}

// Execute D1 query via REST API
export async function executeD1Query(sql: string, params: any[] = []): Promise<any[]> {
    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN || !D1_DATABASE_ID) {
        console.error('Missing Cloudflare D1 configuration');
        console.error('CLOUDFLARE_ACCOUNT_ID:', !!CLOUDFLARE_ACCOUNT_ID);
        console.error('CLOUDFLARE_API_TOKEN:', !!CLOUDFLARE_API_TOKEN);
        console.error('D1_DATABASE_ID:', !!D1_DATABASE_ID);
        return [];
    }

    try {
        // Replace ? placeholders with actual escaped values
        let finalSql = sql;
        let paramIndex = 0;
        finalSql = sql.replace(/\?/g, () => {
            const value = params[paramIndex++];
            return escapeSql(value);
        });

        console.log('Executing D1 Query:', finalSql.substring(0, 200));

        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${D1_DATABASE_ID}/query`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sql: finalSql }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('D1 API Error:', response.status, errorText);
            return [];
        }

        const data: D1Response = await response.json();

        if (!data.success) {
            console.error('D1 Query Error:', data.errors);
            return [];
        }

        return data.result?.[0]?.results || [];
    } catch (e) {
        console.error("D1 Execution Error", e);
        return [];
    }
}

// Get all products
export async function getProductsFromD1(): Promise<Product[]> {
    const results = await executeD1Query('SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC');

    // Map database columns to Product interface
    return results.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        carBrand: row.car_brand,
        carModel: row.car_model,
        carYear: row.car_year,
        category: row.category,
        imageUrl: row.image_url,
        images: row.images ? JSON.parse(row.images) : [],
        stock: row.stock,
        isActive: row.is_active === 1,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    }));
}

// Get single product by ID
export async function getProductByIdFromD1(id: string): Promise<Product | null> {
    const results = await executeD1Query('SELECT * FROM products WHERE id = ?', [id]);

    if (results.length === 0) return null;

    const row = results[0];
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        carBrand: row.car_brand,
        carModel: row.car_model,
        carYear: row.car_year,
        category: row.category,
        imageUrl: row.image_url,
        images: row.images ? JSON.parse(row.images) : [],
        stock: row.stock,
        isActive: row.is_active === 1,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

// Add product
export async function addProductToD1(product: any): Promise<Product> {
    const id = `prod-${Date.now()}`;
    const now = new Date().toISOString();

    await executeD1Query(
        `INSERT INTO products (id, name, description, price, car_brand, car_model, car_year, category, image_url, images, stock, is_active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
        [
            id,
            product.name,
            product.description || '',
            product.price,
            product.carBrand,
            product.carModel,
            product.carYear || '',
            product.category,
            product.imageUrl || '',
            JSON.stringify(product.images || []), // Save images array
            product.stock || 0,
            now,
            now
        ]
    );

    return {
        ...product,
        id,
        isActive: true,
        createdAt: now,
        updatedAt: now
    };
}

// Update product
export async function updateProductInD1(id: string, product: Partial<Product>): Promise<boolean> {
    const now = new Date().toISOString();

    const updates: string[] = [];
    const values: any[] = [];

    if (product.name !== undefined) { updates.push('name = ?'); values.push(product.name); }
    if (product.description !== undefined) { updates.push('description = ?'); values.push(product.description); }
    if (product.price !== undefined) { updates.push('price = ?'); values.push(product.price); }
    if (product.carBrand !== undefined) { updates.push('car_brand = ?'); values.push(product.carBrand); }
    if (product.carModel !== undefined) { updates.push('car_model = ?'); values.push(product.carModel); }
    if (product.carYear !== undefined) { updates.push('car_year = ?'); values.push(product.carYear); }
    if (product.category !== undefined) { updates.push('category = ?'); values.push(product.category); }
    if (product.imageUrl !== undefined) { updates.push('image_url = ?'); values.push(product.imageUrl); }
    if (product.images !== undefined) { updates.push('images = ?'); values.push(JSON.stringify(product.images)); }
    if (product.stock !== undefined) { updates.push('stock = ?'); values.push(product.stock); }
    if (product.isActive !== undefined) { updates.push('is_active = ?'); values.push(product.isActive ? 1 : 0); }

    updates.push('updated_at = ?');
    values.push(now);
    values.push(id);

    await executeD1Query(
        `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
        values
    );

    return true;
}

// Delete product
export async function deleteProductFromD1(id: string): Promise<boolean> {
    await executeD1Query('UPDATE products SET is_active = 0 WHERE id = ?', [id]);
    return true;
}
