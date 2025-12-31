import React, { useState } from 'react';
import Editor from './Editor';

interface OutputProps {
    result: any;
}

export default function Output({ result }: OutputProps) {
    const [activeFileIndex, setActiveFileIndex] = useState(0);

    if (!result) return (
        <div className="h-full flex items-center justify-center text-gray-400">
            Output will appear here
        </div>
    );

    const files = result.files || [];
    const activeFile = files[activeFileIndex];

    return (
        <div className="lex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="flex bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                {files.map((file: any, idx: number) => (
                    <button
                        key={file.path}
                        onClick={() => setActiveFileIndex(idx)}
                        className={`px-4 py-2 text-xs font-mono whitespace-nowrap focus:outline-none ${idx === activeFileIndex
                                ? 'bg-white dark:bg-gray-900 text-indigo-600 border-t-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                    >
                        {file.path}
                    </button>
                ))}
            </div>
            <div className="flex-1 relative h-[calc(100%-2.5rem)]">
                <Editor
                    value={activeFile?.content || ''}
                    onChange={() => { }}
                    placeholder="Output..."
                />
            </div>
        </div>
    );
}
