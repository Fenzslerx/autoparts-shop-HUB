import { NextRequest, NextResponse } from 'next/server';
import { processUserMessage } from '@/lib/chat-service';
import { CHATBOT_CONFIG } from '@/lib/constants';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, productId } = body;

        const response = await processUserMessage(message, productId);

        return NextResponse.json(response);

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { message: CHATBOT_CONFIG.ERROR_MESSAGE, products: [] },
            { status: 500 }
        );
    }
}
