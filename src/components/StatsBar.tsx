import React from 'react';

interface StatsBarProps {
    files: any[];
}

export default function StatsBar({ files }: StatsBarProps) {
    const totalFiles = files.length;
    const totalLines = files.reduce((acc, file) => acc + file.content.split('\n').length, 0);

    return (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex justify-between text-xs text-gray-500 font-mono">
            <span>Files: {totalFiles}</span>
            <span>Total Lines: {totalLines}</span>
            <span>Target: PySpark</span>
        </div>
    );
}
