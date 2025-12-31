import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import { ThemeProvider } from '@/contexts/ThemeContext';

/**
 * Application metadata for SEO
 */
export const metadata: Metadata = {
    title: 'SAS2Py - SAS to PySpark/Databricks Converter',
    description: 'Convert SAS code to PySpark or Databricks notebooks with intelligent code transformation',
};

/**
 * Root layout component
 * Provides the base HTML structure with navigation
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                {/* Google Fonts - Inter and JetBrains Mono */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                <ThemeProvider>
                    <NavBar />
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
