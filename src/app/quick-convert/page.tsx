'use client';

import { useState } from 'react';
import Editor from '@/components/Editor';

export default function QuickConvertPage() {
    const [sasCode, setSasCode] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleConvert = async () => {
        setIsConverting(true);
        try {
            const response = await fetch('/api/quick-convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sasCode, target: 'pyspark_bdh' })
            });
            const data = await response.json();
            setResult(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsConverting(false);
        }
    };

    const handleCopy = () => {
        if (!result) return;
        const code = result.files[0].content;
        navigator.clipboard.writeText(code);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <div className="min-h-screen pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-6 h-[80vh]">
                {/* SAS Input Panel */}
                <div className="flex flex-col panel panel-sas">
                    <div className="panel-header">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">SAS Input</span>
                    </div>
                    <div className="flex-1 relative">
                        <Editor
                            value={sasCode}
                            onChange={setSasCode}
                            placeholder="Paste your SAS code here..."
                        />
                    </div>
                </div>

                {/* PySpark Output Panel */}
                <div className="flex flex-col panel panel-pyspark">
                    <div className="panel-header">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">PySpark Output</span>
                        {result && (
                            <button onClick={handleCopy} className={`btn btn-sm ${copySuccess ? 'btn-success' : 'btn-secondary'}`}>
                                {copySuccess ? 'Copied!' : 'Copy Code'}
                            </button>
                        )}
                    </div>
                    <div className="flex-1 relative bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        {result ? (
                            <pre className="p-4 text-sm font-mono text-gray-800 dark:text-gray-200 overflow-auto h-full">
                                {result.files[0].content}
                            </pre>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                {isConverting ? 'Converting...' : 'Output will appear here'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
                <button
                    onClick={handleConvert}
                    disabled={!sasCode || isConverting}
                    className="convert-button shadow-xl"
                >
                    {isConverting ? 'Processing...' : 'Convert to PySpark'}
                </button>
            </div>
        </div>
    );
}
