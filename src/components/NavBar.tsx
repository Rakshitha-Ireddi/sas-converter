'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Navigation bar component
 * Displays logo and navigation links
 */
export default function NavBar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    // Navigation links configuration
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/quick-convert', label: 'Convert' },
        { href: '/help', label: 'Help' },
    ];

    /**
     * Check if a link is active
     */
    const isActive = (href: string): boolean => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-900/95 backdrop-blur border-b border-gray-200 dark:border-dark-700 transition-colors">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo.svg" alt="SAS2Py" className="w-10 h-10" />
                        <div>
                            <span className="text-xl font-bold text-primary-500">SAS2Py</span>
                            <span className="text-xs text-gray-500 dark:text-dark-400 block">Spark Your SAS Logic</span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-400 dark:text-dark-400 hover:text-primary-500 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        <Link
                            href="/login"
                            className="btn btn-secondary ml-4"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Login
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
