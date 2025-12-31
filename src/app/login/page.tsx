'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Login page component
 * Simple validation login page
 */
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Strict email validation for @barclays.com
        if (!email.toLowerCase().endsWith('@barclays.com')) {
            setError('Please use a valid Barclays email address (@barclays.com)');
            return;
        }

        // Simulate successful login
        // In a real app, this would call an authentication API
        router.push('/quick-convert');
    };

    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <img src="/logo.svg" alt="SAS2Py" className="w-12 h-12" />
                        <span className="text-2xl font-bold text-primary-500">SAS2Py</span>
                    </div>
                    <p className="text-dark-300">Sign in to your account</p>
                </div>

                {/* Login Form */}
                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                                placeholder="username@barclays.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-dark-200 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-dark-300">
                                <input type="checkbox" className="w-4 h-4 rounded border-dark-500" />
                                Remember me
                            </label>
                            <a href="#" className="text-sm text-primary-500 hover:text-primary-400">
                                Forgot password?
                            </a>
                        </div>

                        <button type="submit" className="btn btn-primary w-full py-3">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-dark-400 mb-2">
                            Unauthorized access is prohibited
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
