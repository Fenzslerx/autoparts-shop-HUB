import { Product } from './types'
import {
    getProductsFromD1,
    addProductToD1,
    getProductByIdFromD1,
    updateProductInD1,
    executeD1Query
} from './cloudflare-db'

// Adapter function to make D1 behave like the old JSON db
// This prevents breaking changes in other files

export async function getProducts(): Promise<Product[]> {
    try {
        // getProductsFromD1 already returns camelCase mapped data
        const products = await getProductsFromD1()
        return products
    } catch (error) {
        console.error('Error fetching products from D1:', error)
        return []
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        return await getProductByIdFromD1(id)
    } catch (error) {
        console.error('Error fetching product by ID:', error)
        return null
    }
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return await addProductToD1(product)
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    try {
        const success = await updateProductInD1(id, updates)
        if (success) {
            return await getProductById(id)
        }
        return null
    } catch (error) {
        console.error('Error updating product:', error)
        return null
    }
}

export async function deleteProduct(id: string): Promise<boolean> {
    // Soft delete - just mark as inactive
    await executeD1Query('UPDATE products SET is_active = 0 WHERE id = ?', [id])
    return true
}

// Deprecated: No-op for D1
export async function saveProducts(products: Product[]): Promise<void> {
    // No-op
}
