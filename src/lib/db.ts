import { Product } from './types'
import {
    addProductToD1,
    deleteProductFromD1,
    getProductByIdFromD1,
    getProductsFromD1,
    updateProductInD1,
} from './cloudflare-db'
import { isD1Configured, isSupabaseConfigured } from './env'
import {
    addLocalProduct,
    deleteLocalProduct,
    readLocalProducts,
    updateLocalProduct,
    writeLocalProducts,
} from './local-store'
import {
    addProductToSupabase,
    deleteProductFromSupabase,
    getProductByIdFromSupabase,
    getProductsFromSupabase,
    updateProductInSupabase,
} from './supabase-db'

export async function getProducts(options?: { includeInactive?: boolean }): Promise<Product[]> {
    if (isSupabaseConfigured()) {
        try {
            return await getProductsFromSupabase(options)
        } catch (error) {
            console.error('Error fetching products from Supabase:', error)
        }
    }

    if (isD1Configured()) {
        try {
            const products = await getProductsFromD1(options)
            if (products.length > 0) {
                return products
            }
        } catch (error) {
            console.error('Error fetching products from D1:', error)
        }
    }

    const products = await readLocalProducts()
    return options?.includeInactive ? products : products.filter((product) => product.isActive !== false)
}

export async function getProductById(id: string): Promise<Product | null> {
    if (isSupabaseConfigured()) {
        try {
            const product = await getProductByIdFromSupabase(id)
            if (product) return product
        } catch (error) {
            console.error('Error fetching product by ID from Supabase:', error)
        }
    }

    if (isD1Configured()) {
        try {
            const product = await getProductByIdFromD1(id)
            if (product) return product
        } catch (error) {
            console.error('Error fetching product by ID from D1:', error)
        }
    }

    const products = await readLocalProducts()
    return products.find((product) => product.id === id) || null
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    if (isSupabaseConfigured()) {
        try {
            return await addProductToSupabase(product)
        } catch (error) {
            console.error('Error adding product to Supabase:', error)
        }
    }

    if (isD1Configured()) {
        try {
            return await addProductToD1(product)
        } catch (error) {
            console.error('Error adding product to D1:', error)
        }
    }

    return await addLocalProduct(product)
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    if (isSupabaseConfigured()) {
        try {
            return await updateProductInSupabase(id, updates)
        } catch (error) {
            console.error('Error updating product in Supabase:', error)
        }
    }

    if (isD1Configured()) {
        try {
            const success = await updateProductInD1(id, updates)
            if (success) {
                return await getProductById(id)
            }
        } catch (error) {
            console.error('Error updating product in D1:', error)
        }
    }

    return await updateLocalProduct(id, updates)
}

export async function deleteProduct(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
        try {
            return await deleteProductFromSupabase(id)
        } catch (error) {
            console.error('Error deleting product from Supabase:', error)
        }
    }

    if (isD1Configured()) {
        try {
            return await deleteProductFromD1(id)
        } catch (error) {
            console.error('Error deleting product from D1:', error)
        }
    }

    return await deleteLocalProduct(id)
}

export async function saveProducts(products: Product[]): Promise<void> {
    await writeLocalProducts(products)
}
