// export const runtime = 'edge'

export async function POST(request: NextRequest) {
    try {
        const { page, productId } = await request.json()

        await logVisitor(
            page,
            productId,
            {
                ip: request.headers.get('x-forwarded-for') || undefined,
                userAgent: request.headers.get('user-agent') || undefined
            }
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to log' }, { status: 500 })
    }
}

export const runtime = 'edge'
