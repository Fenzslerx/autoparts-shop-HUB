import { Product } from './types'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json')

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.dirname(DATA_FILE)
    if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true })
    }
}

// Read all products from JSON file
export async function getProducts(): Promise<Product[]> {
    try {
        await ensureDataDir()
        if (!existsSync(DATA_FILE)) {
            return []
        }
        const data = await readFile(DATA_FILE, 'utf-8')
        const json = JSON.parse(data)
        return json.products || []
    } catch (error) {
        console.error('Error reading products:', error)
        return []
    }
}

// Save products to JSON file
export async function saveProducts(products: Product[]): Promise<void> {
    await ensureDataDir()
    await writeFile(DATA_FILE, JSON.stringify({ products }, null, 2), 'utf-8')
}

// Get single product by ID
export async function getProductById(id: string): Promise<Product | null> {
    const products = await getProducts()
    return products.find(p => p.id === id) || null
}

// Add new product
export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const products = await getProducts()

    const newProduct: Product = {
        ...product,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
    }

    products.push(newProduct)
    await saveProducts(products)

    return newProduct
}

// Update product
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const products = await getProducts()
    const index = products.findIndex(p => p.id === id)

    if (index === -1) return null

    products[index] = {
        ...products[index],
        ...updates,
        updatedAt: new Date().toISOString().split('T')[0],
    }

    await saveProducts(products)
    return products[index]
}

// Delete product
export async function deleteProduct(id: string): Promise<boolean> {
    const products = await getProducts()
    const filtered = products.filter(p => p.id !== id)

    if (filtered.length === products.length) return false

    await saveProducts(filtered)
    return true
}
