'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
    id: string;
    type: 'user' | 'bot';
    text: string;
}

const FAQ_TOPICS = [
    { question: "What does this tool do?", answer: "This platform converts SAS code (DATA steps, PROCs, Macros) into optimized PySpark code for Databricks or BDH environments." },
    { question: "How do I convert code?", answer: "Go to the 'Convert' page. You can either paste your SAS code directly or upload a .sas/.zip file. Choose your target (PySpark/Databricks) and click Convert." },
    { question: "Does it support Macros?", answer: "Yes! The converter automatically handles SAS macros, expanding them or converting framework macros (like %metadata) into Python utility function calls." },
    { question: "Can I download results?", answer: "Yes. If you upload a ZIP file, you can download the converted project as a ZIP. For text input, you can copy the output directly." }
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'bot', text: 'Hi! I can help explain the platform or how transformations work. Ask me a question or choose a topic below.' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: Message = { id: Date.now().toString(), type: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Simulate bot delay
        setTimeout(() => {
            let botResponse = "I'm not sure about that. Try asking about 'SAS conversion', 'macros', or check the FAQ topics.";

            const lowerText = text.toLowerCase();
            if (lowerText.includes('hello') || lowerText.includes('hi')) {
                botResponse = "Hello! How can I assist you today?";
            } else if (lowerText.includes('transform') || lowerText.includes('convert')) {
                botResponse = "The transformation process parses SAS code into an Abstract Syntax Tree (AST) and then maps patterns (like DATA steps and PROC SQL) to PySpark DataFrame operations.";
            } else if (lowerText.includes('input') || lowerText.includes('upload')) {
                botResponse = "You can upload .sas files for text conversion or .zip files for full project conversion including multiple files.";
            }

            // Check against FAQs
            const faq = FAQ_TOPICS.find(f => lowerText.includes(f.question.toLowerCase()) || text === f.question);
            if (faq) botResponse = faq.answer;

            const botMsg: Message = { id: (Date.now() + 1).toString(), type: 'bot', text: botResponse };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend(inputText);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-surface shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-700 flex flex-col transition-all animate-fade-in-up"
                    style={{ height: '500px', backgroundColor: 'var(--color-surface)' }}>
                    {/* Header */}
                    <div className="bg-primary-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="font-semibold">AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-dark-900 space-y-4">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${msg.type === 'user'
                                        ? 'bg-primary-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm border border-gray-100 dark:border-dark-700'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-dark-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-dark-700">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* FAQ Chips */}
                    <div className="px-4 pb-2 bg-gray-50 dark:bg-dark-900 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="flex gap-2">
                            {FAQ_TOPICS.map((faq, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(faq.question)}
                                    className="px-3 py-1 text-xs bg-white dark:bg-dark-800 text-primary-600 border border-primary-200 dark:border-dark-600 rounded-full hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors"
                                >
                                    {faq.question}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-surface border-t border-gray-200 dark:border-dark-700">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask a question..."
                                className="w-full pl-4 pr-10 py-2 rounded-xl text-sm bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-white border-none focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                            <button
                                onClick={() => handleSend(inputText)}
                                disabled={!inputText.trim()}
                                className="absolute right-2 top-1.5 p-1 text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${isOpen ? 'bg-gray-600 text-white' : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    }`}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
