'use client';

import { useEffect, useRef } from 'react';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function Editor({ value, onChange, placeholder }: EditorProps) {
    // Simple textarea based editor for now, replacing the Monaco complexity for recovery
    return (
        <div className="relative w-full h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center pt-4 text-xs text-gray-400 select-none">
                {/* Line numbers (fake) */}
                {value.split('\n').map((_, i) => (
                    <div key={i} className="h-6">{i + 1}</div>
                ))}
            </div>
            <textarea
                className="w-full h-full pl-10 p-4 font-mono text-sm bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 resize-none whitespace-pre"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                spellCheck={false}
                style={{ lineHeight: '1.5rem' }}
            />
        </div>
    );
}
