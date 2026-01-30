import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// R2 Configuration (S3-compatible)
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

// Public R2.dev URL
const R2_PUBLIC_URL = 'https://pub-7317646fe751438aab922bda666d9eaf.r2.dev';

// Create S3 client for R2
function getS3Client() {
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
        throw new Error('Missing R2 configuration. Please check environment variables.');
    }

    return new S3Client({
        region: 'auto',
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: R2_ACCESS_KEY_ID,
            secretAccessKey: R2_SECRET_ACCESS_KEY,
        },
    });
}

export async function uploadToR2(file: Buffer, filename: string, contentType: string): Promise<string> {
    const s3Client = getS3Client();
    const key = `products/${filename}`;

    try {
        await s3Client.send(new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
            Body: file,
            ContentType: contentType,
        }));

        // Return public URL
        return `${R2_PUBLIC_URL}/${key}`;
    } catch (error) {
        console.error('R2 Upload Error:', error);
        throw error;
    }
}

export async function deleteFromR2(key: string): Promise<void> {
    try {
        const s3Client = getS3Client();

        await s3Client.send(new DeleteObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
        }));
    } catch (error) {
        console.error('R2 Delete Error:', error);
        // Don't throw - deletion failures shouldn't break the app
    }
}
