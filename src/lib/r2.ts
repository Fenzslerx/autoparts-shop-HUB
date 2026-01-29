import { getRequestContext } from '@cloudflare/next-on-pages';

// Public R2.dev URL
const R2_PUBLIC_URL = 'https://pub-7317646fe751438aab922bda666d9eaf.r2.dev'

export async function uploadToR2(file: Buffer, filename: string, contentType: string): Promise<string> {
    const { env } = getRequestContext();
    const bucket = env.R2;

    if (!bucket) {
        // Fallback or error if R2 is not bound
        console.error('R2 binding not found');
        throw new Error('R2 binding not found');
    }

    const key = `products/${filename}`

    await bucket.put(key, file, {
        httpMetadata: { contentType }
    })

    // Return public URL
    return `${R2_PUBLIC_URL}/${key}`
}

export async function deleteFromR2(key: string): Promise<void> {
    const { env } = getRequestContext();
    const bucket = env.R2;

    if (!bucket) return;

    await bucket.delete(key)
}

