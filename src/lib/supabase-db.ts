import type { Product } from './types'
import { getSupabaseAdminClient } from './supabase'

type ProductRow = {
  id: string
  name: string
  description: string | null
  price: number
  car_brand: string
  car_model: string
  car_year: string | null
  category: string
  image_url: string | null
  images: string[] | null
  stock: number | null
  is_active: boolean | null
  is_deleted: boolean | null
  created_at: string | null
  updated_at: string | null
}

type LogRow = {
  id: string
  type: string
  action: string
  data: Record<string, any> | null
  ip: string | null
  user_agent: string | null
  created_at: string | null
}

function mapProductRow(row: ProductRow): Product {
  const images = Array.isArray(row.images)
    ? row.images.filter(Boolean)
    : row.image_url
      ? [row.image_url]
      : []

  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    price: Number(row.price || 0),
    carBrand: row.car_brand,
    carModel: row.car_model,
    carYear: row.car_year || '',
    category: row.category,
    imageUrl: row.image_url || images[0] || '',
    images,
    stock: Number(row.stock || 0),
    isActive: row.is_active !== false,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  }
}

function mapLogRow(row: LogRow) {
  return {
    id: row.id,
    type: row.type as 'product' | 'auth' | 'visitor' | 'contact',
    action: row.action as
      | 'create'
      | 'update'
      | 'delete'
      | 'login'
      | 'login_failed'
      | 'login_rate_limited'
      | 'logout'
      | 'page_view'
      | 'inquiry',
    timestamp: row.created_at || new Date().toISOString(),
    data: row.data || {},
    ip: row.ip || undefined,
    userAgent: row.user_agent || undefined,
  }
}

export async function getProductsFromSupabase(options: { includeInactive?: boolean } = {}): Promise<Product[]> {
  const supabase = getSupabaseAdminClient()
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_deleted', false)
    .order('updated_at', { ascending: false })
    .order('created_at', { ascending: false })

  if (!options.includeInactive) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
  if (error) throw error
  return (data || []).map((row) => mapProductRow(row as ProductRow))
}

export async function getProductByIdFromSupabase(id: string): Promise<Product | null> {
  const supabase = getSupabaseAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_deleted', false)
    .maybeSingle()

  if (error) throw error
  return data ? mapProductRow(data as ProductRow) : null
}

export async function addProductToSupabase(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const supabase = getSupabaseAdminClient()
  const now = new Date().toISOString()
  const payload = {
    id: `prod-${Date.now()}`,
    name: product.name,
    description: product.description || '',
    price: product.price,
    car_brand: product.carBrand,
    car_model: product.carModel,
    car_year: product.carYear || '',
    category: product.category,
    image_url: product.imageUrl || product.images?.[0] || '',
    images: product.images || [],
    stock: product.stock || 0,
    is_active: product.isActive !== false,
    is_deleted: false,
    created_at: now,
    updated_at: now,
  }

  const { data, error } = await supabase.from('products').insert(payload).select('*').single()
  if (error) throw error
  return mapProductRow(data as ProductRow)
}

export async function updateProductInSupabase(id: string, updates: Partial<Product>): Promise<Product | null> {
  const supabase = getSupabaseAdminClient()
  const payload: Record<string, any> = {
    updated_at: new Date().toISOString(),
  }

  if (updates.name !== undefined) payload.name = updates.name
  if (updates.description !== undefined) payload.description = updates.description
  if (updates.price !== undefined) payload.price = updates.price
  if (updates.carBrand !== undefined) payload.car_brand = updates.carBrand
  if (updates.carModel !== undefined) payload.car_model = updates.carModel
  if (updates.carYear !== undefined) payload.car_year = updates.carYear
  if (updates.category !== undefined) payload.category = updates.category
  if (updates.imageUrl !== undefined) payload.image_url = updates.imageUrl
  if (updates.images !== undefined) payload.images = updates.images
  if (updates.stock !== undefined) payload.stock = updates.stock
  if (updates.isActive !== undefined) payload.is_active = updates.isActive

  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .eq('is_deleted', false)
    .select('*')
    .maybeSingle()

  if (error) throw error
  return data ? mapProductRow(data as ProductRow) : null
}

export async function deleteProductFromSupabase(id: string): Promise<boolean> {
  const supabase = getSupabaseAdminClient()
  const { error, data } = await supabase
    .from('products')
    .update({ is_deleted: true, is_active: false, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('is_deleted', false)
    .select('id')

  if (error) throw error
  return Boolean(data && data.length > 0)
}

export async function addLogToSupabase(entry: {
  id: string
  type: string
  action: string
  data: Record<string, any>
  ip?: string
  userAgent?: string
  timestamp: string
}) {
  const supabase = getSupabaseAdminClient()
  const { error } = await supabase.from('logs').insert({
    id: entry.id,
    type: entry.type,
    action: entry.action,
    data: entry.data,
    ip: entry.ip || null,
    user_agent: entry.userAgent || null,
    created_at: entry.timestamp,
  })

  if (error) throw error
}

export async function getLogsFromSupabase(options?: {
  type?: string
  limit?: number
  startDate?: string
  endDate?: string
}) {
  const supabase = getSupabaseAdminClient()
  let query = supabase.from('logs').select('*').order('created_at', { ascending: false })

  if (options?.type) query = query.eq('type', options.type)
  if (options?.startDate) query = query.gte('created_at', options.startDate)
  if (options?.endDate) query = query.lte('created_at', options.endDate)
  if (options?.limit) query = query.limit(options.limit)

  const { data, error } = await query
  if (error) throw error
  return (data || []).map((row) => mapLogRow(row as LogRow))
}
