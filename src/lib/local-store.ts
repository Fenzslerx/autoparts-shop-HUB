import fs from 'fs/promises';
import path from 'path';
import { Product } from './types';

export interface StoredLogEntry {
  id: string;
  type: 'product' | 'auth' | 'visitor' | 'contact';
  action:
    | 'create'
    | 'update'
    | 'delete'
    | 'login'
    | 'login_failed'
    | 'login_rate_limited'
    | 'logout'
    | 'page_view'
    | 'inquiry';
  timestamp: string;
  data: Record<string, any>;
  ip?: string;
  userAgent?: string;
}

const dataDir = path.join(process.cwd(), 'data');
const productsFile = path.join(dataDir, 'products.json');
const logsFile = path.join(dataDir, 'logs.json');

interface ProductFileShape {
  products?: Product[];
}

interface LogFileShape {
  logs?: StoredLogEntry[];
}

function normalizeProduct(product: Partial<Product>): Product {
  return {
    id: String(product.id || `prod-${Date.now()}`),
    name: String(product.name || ''),
    description: String(product.description || ''),
    price: Number(product.price || 0),
    carBrand: String(product.carBrand || ''),
    carModel: String(product.carModel || ''),
    carYear: String(product.carYear || ''),
    category: String(product.category || ''),
    imageUrl: String(product.imageUrl || product.images?.[0] || ''),
    images: Array.isArray(product.images)
      ? product.images.filter(Boolean).map(String)
      : product.imageUrl
        ? [String(product.imageUrl)]
        : [],
    stock: Number(product.stock || 0),
    isActive: product.isActive !== false,
    createdAt: String(product.createdAt || new Date().toISOString()),
    updatedAt: String(product.updatedAt || new Date().toISOString()),
  };
}

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf8');
}

export async function readLocalProducts(): Promise<Product[]> {
  const fileData = await readJsonFile<ProductFileShape>(productsFile, { products: [] });
  return (fileData.products || []).map(normalizeProduct);
}

export async function writeLocalProducts(products: Product[]) {
  await writeJsonFile(productsFile, { products: products.map(normalizeProduct) });
}

export async function addLocalProduct(
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Product> {
  const products = await readLocalProducts();
  const now = new Date().toISOString();
  const newProduct = normalizeProduct({
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  });

  products.unshift(newProduct);
  await writeLocalProducts(products);
  return newProduct;
}

export async function updateLocalProduct(
  id: string,
  updates: Partial<Product>,
): Promise<Product | null> {
  const products = await readLocalProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  const updatedProduct = normalizeProduct({
    ...products[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  });

  products[index] = updatedProduct;
  await writeLocalProducts(products);
  return updatedProduct;
}

export async function deleteLocalProduct(id: string): Promise<boolean> {
  const products = await readLocalProducts();
  const nextProducts = products.filter((product) => product.id !== id);

  if (nextProducts.length === products.length) {
    return false;
  }

  await writeLocalProducts(nextProducts);
  return true;
}

export async function readLocalLogs(): Promise<StoredLogEntry[]> {
  const fileData = await readJsonFile<LogFileShape>(logsFile, { logs: [] });
  return Array.isArray(fileData.logs) ? fileData.logs : [];
}

export async function writeLocalLogs(logs: StoredLogEntry[]) {
  await writeJsonFile(logsFile, { logs });
}
