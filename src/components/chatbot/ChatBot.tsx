'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CHATBOT_CONFIG } from '@/lib/constants';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    products?: any[]; // Optional list of products to display
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

    // Extract product ID from URL if we are on a product page
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
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-gradient-to-r from-blue-600 to-blue-500'
                    }`}
            >
                {isOpen ? (
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-4 sm:right-6 w-[90vw] sm:w-[400px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 transition-all duration-300 origin-bottom-right ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
                    }`}
                style={{ maxHeight: '80vh' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-xl">🤖</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">ผู้ช่วย ช.โชคชัยรถยก</h3>
                        <p className="text-blue-100 text-xs">สอบถามเรื่องอะไหล่ได้ 24 ชม.</p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="h-[400px] overflow-y-auto p-4 bg-gray-50/50 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                }`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user'
                                    ? 'bg-gray-200'
                                    : 'bg-blue-100 text-blue-600'
                                    }`}
                            >
                                {msg.sender === 'user' ? '👤' : '🤖'}
                            </div>
                            <div
                                className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-bl-none'
                                    }`}
                            >
                                <div className="whitespace-pre-wrap">{msg.text}</div>
                                {/* Product Recommendations */}
                                {msg.products && msg.products.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {msg.products.map((product: any) => (
                                            <a
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block bg-gray-50 p-2 rounded-lg border hover:border-blue-300 transition-colors flex items-center gap-2 group"
                                            >
                                                <div className="w-10 h-10 bg-gray-200 rounded-md shrink-0 overflow-hidden">
                                                    {product.imageUrl ? (
                                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs">No Pic</div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-bold text-gray-800 text-xs truncate group-hover:text-blue-600">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-gray-500 text-[10px]">
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
                        <div className="flex items-center gap-2 text-gray-400 text-sm ml-10">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form
                    onSubmit={handleSubmit}
                    className="p-3 border-t bg-white flex items-center gap-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="พิมพ์คำถาม..."
                        className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                    >
                        <svg
                            className="w-5 h-5 translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </>
    );
}
