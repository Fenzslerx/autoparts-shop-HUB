'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CHATBOT_CONFIG } from '@/lib/constants';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    products?: any[];
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: CHATBOT_CONFIG.WELCOME_MESSAGE,
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const getProductContext = () => {
        const match = pathname?.match(/\/products\/([^/]+)/);
        return match ? match[1] : null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.text,
                    productId: getProductContext(),
                }),
            });

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.message,
                sender: 'bot',
                timestamp: new Date(),
                products: data.products,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: CHATBOT_CONFIG.ERROR_MESSAGE,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isOpen ? 'rotate-90 bg-red-500' : 'bg-gradient-to-r from-blue-600 to-blue-500'
                }`}
            >
                {isOpen ? (
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                )}
            </button>

            <div
                className={`fixed bottom-24 right-4 z-50 w-[90vw] origin-bottom-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-all duration-300 sm:right-6 sm:w-[400px] ${
                    isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-10 scale-95 opacity-0'
                }`}
                style={{ maxHeight: '80vh' }}
            >
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <span className="text-xl">🤖</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">ผู้ช่วย ช.โชคชัยรถยก</h3>
                        <p className="text-xs text-blue-100">สอบถามเรื่องอะไหล่ สินค้า และการใช้งานได้ทันที</p>
                    </div>
                </div>

                <div className="h-[400px] space-y-4 overflow-y-auto bg-gray-50/50 p-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                    msg.sender === 'user' ? 'bg-gray-200' : 'bg-blue-100 text-blue-600'
                                }`}
                            >
                                {msg.sender === 'user' ? '👤' : '🤖'}
                            </div>
                            <div
                                className={`max-w-[75%] rounded-2xl p-3 text-sm leading-relaxed ${
                                    msg.sender === 'user'
                                        ? 'rounded-br-none bg-blue-600 text-white'
                                        : 'rounded-bl-none border border-gray-100 bg-white text-gray-700 shadow-sm'
                                }`}
                            >
                                <div className="whitespace-pre-wrap">{msg.text}</div>
                                {msg.products && msg.products.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {msg.products.map((product: any) => (
                                            <a
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center gap-2 rounded-lg border bg-gray-50 p-2 transition-colors hover:border-blue-300"
                                            >
                                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-200">
                                                    {product.imageUrl ? (
                                                        <Image
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            fill
                                                            sizes="40px"
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-xs">No Pic</div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="truncate text-xs font-bold text-gray-800 group-hover:text-blue-600">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-[10px] text-gray-500">
                                                        {product.carModel} {product.carYear}
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="ml-10 flex items-center gap-2 text-sm text-gray-400">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0s' }} />
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.2s' }} />
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.4s' }} />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t bg-white p-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="พิมพ์คำถาม..."
                        className="flex-grow rounded-full bg-gray-100 px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="rounded-full bg-blue-600 p-2 text-white shadow-md transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <svg className="h-5 w-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </>
    );
}
