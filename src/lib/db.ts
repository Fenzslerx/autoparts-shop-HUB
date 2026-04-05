import { Product } from './types'
import { getRuntimeDataSourceState, setRuntimeDataSourceState } from './data-source-status'
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
    isSupabaseSchemaMissingError,
    updateProductInSupabase,
} from './supabase-db'

let hasLoggedSupabaseSchemaWarning = false

function setSupabaseSchemaWarning(error: unknown) {
    const fallbackWarning =
        'Supabase is configured but required tables are missing. Run supabase-schema.sql in the Supabase SQL Editor.'

    setRuntimeDataSourceState({
        source: 'local',
        warning: fallbackWarning,
    })

    if (!hasLoggedSupabaseSchemaWarning) {
        console.error(fallbackWarning, error)
        hasLoggedSupabaseSchemaWarning = true
    }
}

function clearRuntimeWarning(source: 'supabase' | 'd1' | 'local') {
    setRuntimeDataSourceState({ source })
    if (source === 'supabase') {
        hasLoggedSupabaseSchemaWarning = false
    }
}

export async function getProducts(options?: { includeInactive?: boolean }): Promise<Product[]> {
    if (isSupabaseConfigured()) {
        try {
            const products = await getProductsFromSupabase(options)
            clearRuntimeWarning('supabase')
            return products
        } catch (error) {
            if (isSupabaseSchemaMissingError(error)) {
                setSupabaseSchemaWarning(error)
            } else {
                console.error('Error fetching products from Supabase:', error)
            }
        }
    }

    if (isD1Configured()) {
        try {
            const products = await getProductsFromD1(options)
            if (products.length > 0) {
                clearRuntimeWarning('d1')
                return products
            }
        } catch (error) {
            console.error('Error fetching products from D1:', error)
        }
    }

    const products = await readLocalProducts()
    if (!getRuntimeDataSourceState().warning) {
        clearRuntimeWarning('local')
    }
    return options?.includeInactive ? products : products.filter((product) => product.isActive !== false)
}

export async function getProductById(id: string): Promise<Product | null> {
    if (isSupabaseConfigured()) {
        try {
            const product = await getProductByIdFromSupabase(id)
            clearRuntimeWarning('supabase')
            if (product) return product
        } catch (error) {
            if (isSupabaseSchemaMissingError(error)) {
                setSupabaseSchemaWarning(error)
            } else {
                console.error('Error fetching product by ID from Supabase:', error)
            }
        }
    }

    if (isD1Configured()) {
        try {
            const product = await getProductByIdFromD1(id)
            clearRuntimeWarning('d1')
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
            const createdProduct = await addProductToSupabase(product)
            clearRuntimeWarning('supabase')
            return createdProduct
        } catch (error) {
            if (isSupabaseSchemaMissingError(error)) {
                setSupabaseSchemaWarning(error)
            } else {
                console.error('Error adding product to Supabase:', error)
            }
        }
    }

    if (isD1Configured()) {
        try {
            const createdProduct = await addProductToD1(product)
            clearRuntimeWarning('d1')
            return createdProduct
        } catch (error) {
            console.error('Error adding product to D1:', error)
        }
    }

    return await addLocalProduct(product)
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    if (isSupabaseConfigured()) {
        try {
            const product = await updateProductInSupabase(id, updates)
            clearRuntimeWarning('supabase')
            return product
        } catch (error) {
            if (isSupabaseSchemaMissingError(error)) {
                setSupabaseSchemaWarning(error)
            } else {
                console.error('Error updating product in Supabase:', error)
            }
        }
    }

    if (isD1Configured()) {
        try {
            const success = await updateProductInD1(id, updates)
            if (success) {
                clearRuntimeWarning('d1')
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
            const deleted = await deleteProductFromSupabase(id)
            clearRuntimeWarning('supabase')
            return deleted
        } catch (error) {
            if (isSupabaseSchemaMissingError(error)) {
                setSupabaseSchemaWarning(error)
            } else {
                console.error('Error deleting product from Supabase:', error)
            }
        }
    }

    if (isD1Configured()) {
        try {
            const deleted = await deleteProductFromD1(id)
            clearRuntimeWarning('d1')
            return deleted
        } catch (error) {
            console.error('Error deleting product from D1:', error)
        }
    }

    return await deleteLocalProduct(id)
}

export async function saveProducts(products: Product[]): Promise<void> {
    await writeLocalProducts(products)
}
