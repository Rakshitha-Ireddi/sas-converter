'use client';

import { useState } from 'react';
import Editor from '@/components/Editor';
import Output from '@/components/Output';
import TargetSelector from '@/components/TargetSelector';
import ConvertButton from '@/components/ConvertButton';
import StatsBar from '@/components/StatsBar';
import { convertSasCode } from '@/lib/api';

export default function QuickConvertPage() {
    const [sasCode, setSasCode] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [target, setTarget] = useState('pyspark');
    const [error, setError] = useState('');

    const handleConvert = async () => {
        setIsConverting(true);
        setError('');
        try {
            const data = await convertSasCode(sasCode, target);
            setResult(data);
        } catch (e: any) {
            setError('Conversion failed. Please check your code or try again.');
            console.error(e);
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-10 px-6 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto h-[85vh] flex flex-col gap-4">

                {/* Controls */}
                <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                    <TargetSelector value={target} onChange={setTarget} />
                    <div className="flex items-center space-x-4">
                        {error && <span className="text-red-500 text-sm">{error}</span>}
                        <ConvertButton onClick={handleConvert} isLoading={isConverting} disabled={!sasCode} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
                    {/* SAS Input Panel */}
                    <div className="flex flex-col h-full">
                        <div className="mb-2 font-semibold text-gray-700 dark:text-gray-200">SAS Input</div>
                        <div className="flex-1 relative">
                            <Editor
                                value={sasCode}
                                onChange={setSasCode}
                                placeholder="Paste your SAS code here..."
                            />
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className="flex flex-col h-full">
                        <div className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Converted Output</div>
                        <div className="flex-1 relative">
                            <Output result={result} />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                {result && result.files && (
                    <div className="rounded-lg overflow-hidden shadow-sm">
                        <StatsBar files={result.files} />
                    </div>
                )}
            </div>
        </div>
    );
}
