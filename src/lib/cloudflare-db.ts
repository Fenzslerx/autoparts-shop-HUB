import { Product } from './types'

const D1_API_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.R2_ACCOUNT_ID}/d1/database/${process.env.D1_DATABASE_ID}/query`

async function executeD1Query(sql: string, params: any[] = []) {
    // Use wrangler for local dev, will switch to API for production
    const { exec } = await import('child_process')
    const { promisify } = await import('util')
    const execAsync = promisify(exec)

    const escapedSql = sql.replace(/"/g, '\\"')
    const paramsJson = JSON.stringify(params)

    try {
        const { stdout } = await execAsync(
            `npx wrangler d1 execute mavarix-db --remote --json --command="${escapedSql}"`,
            { cwd: process.cwd() }
        )
        const result = JSON.parse(stdout)
        return result[0]?.results || []
    } catch (error) {
        console.error('D1 Query Error:', error)
        return []
    }
}

// Get all products
export async function getProductsFromD1(): Promise<Product[]> {
    const results = await executeD1Query('SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC')
    return results.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description || '',
        price: row.price,
        carBrand: row.car_brand,
        carModel: row.car_model,
        carYear: row.car_year || '',
        category: row.category,
        imageUrl: row.image_url || '',
        images: [],
        stock: row.stock || 0,
        isActive: row.is_active === 1,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    }))
}

// Get single product
export async function getProductByIdFromD1(id: string): Promise<Product | null> {
    const results = await executeD1Query(`SELECT * FROM products WHERE id = '${id}'`)
    if (results.length === 0) return null

    const row = results[0]
    return {
        id: row.id,
        name: row.name,
        description: row.description || '',
        price: row.price,
        carBrand: row.car_brand,
        carModel: row.car_model,
        carYear: row.car_year || '',
        category: row.category,
        imageUrl: row.image_url || '',
        images: [],
        stock: row.stock || 0,
        isActive: row.is_active === 1,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    }
}

// Add product
export async function addProductToD1(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const id = `prod-${Date.now()}`
    const now = new Date().toISOString()

    await executeD1Query(`
    INSERT INTO products (id, name, description, price, car_brand, car_model, car_year, category, image_url, stock, is_active, created_at, updated_at)
    VALUES ('${id}', '${product.name}', '${product.description || ''}', ${product.price}, '${product.carBrand}', '${product.carModel}', '${product.carYear || ''}', '${product.category}', '${product.imageUrl || ''}', ${product.stock || 0}, 1, '${now}', '${now}')
  `)

    return {
        ...product,
        id,
        isActive: true,
        createdAt: now,
        updatedAt: now,
    }
}

// Delete product
export async function deleteProductFromD1(id: string): Promise<boolean> {
    await executeD1Query(`DELETE FROM products WHERE id = '${id}'`)
    return true
}
