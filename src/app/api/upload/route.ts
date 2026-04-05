import fs from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { isR2Configured, isSupabaseStorageConfigured } from '@/lib/env'
import { uploadToR2 } from '@/lib/r2'
import { getSupabaseAdminClient, getSupabaseBucketName, getPublicStorageUrl } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const timestamp = Date.now()
        const ext = file.name.split('.').pop()
        const filename = `${timestamp}.${ext}`
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        let imageUrl = ''

        if (isSupabaseStorageConfigured()) {
            const objectPath = `products/${filename}`
            const supabase = getSupabaseAdminClient()
            const { error } = await supabase.storage
                .from(getSupabaseBucketName())
                .upload(objectPath, buffer, {
                    contentType: file.type,
                    upsert: false,
                })

            if (error) {
                throw error
            }

            imageUrl = getPublicStorageUrl(objectPath)
        } else if (isR2Configured()) {
            imageUrl = await uploadToR2(buffer, filename, file.type)
        } else {
            const uploadDir = path.join(process.cwd(), 'public', 'uploads')
            await fs.mkdir(uploadDir, { recursive: true })
            await fs.writeFile(path.join(uploadDir, filename), buffer)
            imageUrl = `/uploads/${filename}`
        }

        return NextResponse.json({ success: true, imageUrl })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed: ' + String(error) }, { status: 500 })
    }
}
