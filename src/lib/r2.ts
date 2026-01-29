import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
})

// Public R2.dev URL
const R2_PUBLIC_URL = 'https://pub-7317646fe751438aab922bda666d9eaf.r2.dev'

export async function uploadToR2(file: Buffer, filename: string, contentType: string): Promise<string> {
    const key = `products/${filename}`

    await S3.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: contentType,
    }))

    // Return public URL
    return `${R2_PUBLIC_URL}/${key}`
}

export async function deleteFromR2(key: string): Promise<void> {
    await S3.send(new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
    }))
}
