import React from 'react';

interface TargetSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function TargetSelector({ value, onChange }: TargetSelectorProps) {
    return (
        <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target:</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                <option value="pyspark">PySpark (Generic)</option>
                <option value="databricks">Databricks Notebook</option>
            </select>
        </div>
    );
}
