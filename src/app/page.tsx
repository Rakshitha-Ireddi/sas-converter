'use client';

import Link from 'next/link';
import ChatWidget from '@/components/ChatWidget';

/**
 * Landing page component
 * Displays hero section and quick access to converter
 */
export default function HomePage() {
    return (
        <div className="min-h-screen bg-dark-900">
            {/* Hero Section */}
            <section className="px-6 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Transform Your SAS Code to
                        <span className="text-primary-500 block mt-2">PySpark and Databricks</span>
                    </h1>
                    <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
                        Intelligent code conversion that preserves your SAS logic,
                        transforming DATA steps, PROC SQL, macros, and more into
                        production-ready PySpark or Databricks notebooks.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/quick-convert"
                            className="convert-button"
                        >
                            Start Converting
                        </Link>
                        <Link
                            href="/help"
                            className="btn btn-secondary"
                        >
                            View Documentation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-16 bg-dark-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Conversion Features
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">DATA Step Conversion</h3>
                            <p className="text-dark-300 text-sm">
                                Converts SET, MERGE, BY group processing, RETAIN, and conditional logic
                                to equivalent PySpark DataFrame operations with proper join semantics.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">PROC SQL Support</h3>
                            <p className="text-dark-300 text-sm">
                                Translates PROC SQL statements including CREATE TABLE, SELECT, joins,
                                and aggregations to Spark SQL or DataFrame API equivalents.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Macro Expansion</h3>
                            <p className="text-dark-300 text-sm">
                                Expands static macros inline and converts dynamic macros to Python
                                functions with parameters stored in configuration files.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="card">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">PROC Procedures</h3>
                            <p className="text-dark-300 text-sm">
                                Handles PROC SORT, PROC TRANSPOSE, PROC APPEND, PROC FREQ, and
                                PROC MEANS with appropriate PySpark transformations.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="card">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Dual Output Targets</h3>
                            <p className="text-dark-300 text-sm">
                                Generate PySpark BDH modules with shell scripts or Databricks
                                notebooks with workflow Jobs JSON for orchestration.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="card">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Configuration Files</h3>
                            <p className="text-dark-300 text-sm">
                                Generates job parameters, database config, email config, and
                                error code mappings as separate JSON files for easy customization.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mapping Overview Section */}
            <section className="px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        SAS to PySpark Mapping
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-dark-600">
                                    <th className="py-3 px-4 text-dark-300 font-medium">SAS Construct</th>
                                    <th className="py-3 px-4 text-dark-300 font-medium">PySpark Equivalent</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-dark-700">
                                    <td className="py-3 px-4 text-white font-mono">DATA step MERGE</td>
                                    <td className="py-3 px-4 text-primary-400 font-mono">df.join()</td>
                                </tr>
                                <tr className="border-b border-dark-700">
                                    <td className="py-3 px-4 text-white font-mono">BY + FIRST./LAST.</td>
                                    <td className="py-3 px-4 text-primary-400 font-mono">Window.partitionBy()</td>
                                </tr>
                                <tr className="border-b border-dark-700">
                                    <td className="py-3 px-4 text-white font-mono">IF/ELSE</td>
                                    <td className="py-3 px-4 text-primary-400 font-mono">F.when().otherwise()</td>
                                </tr>
                                <tr className="border-b border-dark-700">
                                    <td className="py-3 px-4 text-white font-mono">PROC SQL</td>
                                    <td className="py-3 px-4 text-primary-400 font-mono">spark.sql()</td>
                                </tr>
                                <tr className="border-b border-dark-700">
                                    <td className="py-3 px-4 text-white font-mono">PROC SORT</td>
                                    <td className="py-3 px-4 text-primary-400 font-mono">df.orderBy()</td>
                                </tr>
                                <tr className="border-b border-dark-700">
                                    <td className="py-3 px-4 text-white font-mono">PROC TRANSPOSE</td>
                                    <td className="py-3 px-4 text-primary-400 font-mono">df.pivot()</td>
                                </tr>
                                <tr className="border-b border-dark-700">
                                    <td className="py-3 px-4 text-white font-mono">%macro</td>
                                    <td className="py-3 px-4 text-primary-400 font-mono">def function():</td>
                                </tr>
                                <tr className="border-b border-dark-700">
                                    <td className="py-3 px-4 text-white font-mono">%let variable</td>
                                    <td className="py-3 px-4 text-primary-400 font-mono">Config JSON</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-8 border-t border-dark-700 bg-surface">
                <div className="max-w-6xl mx-auto text-center text-dark-400 text-sm">
                    SAS2Py Converter - Code Generation Only - No Execution
                </div>
            </footer>

            {/* AI Assistant Chatbot */}
            <ChatWidget />
        </div>
    );
}
