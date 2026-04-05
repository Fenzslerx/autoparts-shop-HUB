import { NextResponse } from 'next/server'
import { isD1Configured, isSupabaseConfigured, isSupabaseStorageConfigured } from '@/lib/env'
import { checkSupabaseSchemaStatus } from '@/lib/supabase-db'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (isSupabaseConfigured()) {
    const schema = await checkSupabaseSchemaStatus()

    return NextResponse.json({
      source: schema.ready ? 'supabase' : 'local-fallback',
      configured: {
        supabase: true,
        supabaseStorage: isSupabaseStorageConfigured(),
        d1: isD1Configured(),
      },
      schema,
      warning: schema.ready
        ? null
        : 'Supabase is configured but the required tables are missing. Run supabase-schema.sql in the Supabase SQL Editor.',
    })
  }

  return NextResponse.json({
    source: isD1Configured() ? 'd1' : 'local',
    configured: {
      supabase: false,
      supabaseStorage: false,
      d1: isD1Configured(),
    },
    schema: null,
    warning: null,
  })
}
