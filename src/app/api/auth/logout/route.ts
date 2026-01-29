// export const runtime = 'edge'

export async function POST() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_auth')

    // Log logout
    await logAuth('logout', 'admin')

    return NextResponse.json({ success: true })
}

export const runtime = 'edge'
