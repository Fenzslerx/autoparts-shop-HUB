import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseServerKey, getSupabaseStorageBucket, isSupabaseConfigured } from './env'

let cachedClient: SupabaseClient<any> | null = null

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export function getSupabaseAdminClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured')
  }

  if (!cachedClient) {
    cachedClient = createClient<any>(
      getRequiredEnv('SUPABASE_URL'),
      getSupabaseServerKey() || getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    )
  }

  return cachedClient
}

export function getSupabaseBucketName() {
  return getSupabaseStorageBucket()
}

export function getPublicStorageUrl(path: string) {
  const client = getSupabaseAdminClient()
  const { data } = client.storage.from(getSupabaseBucketName()).getPublicUrl(path)
  return data.publicUrl
}
