/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Primary brand colors - matching logo gradient (#20c4f4 -> #00aeef -> #006e98)
                primary: {
                    50: '#e6f9ff',
                    100: '#ccf3ff',
                    200: '#99e7ff',
                    300: '#4dd4f7',
                    400: '#20c4f4',
                    500: '#00aeef',  // Main brand color from logo
                    600: '#0092c8',
                    700: '#006e98',
                    800: '#004d6b',
                    900: '#002d40',
                },
                // Dark theme colors
                dark: {
                    50: '#f5f5f5',
                    100: '#e5e5e5',
                    200: '#d4d4d4',
                    300: '#a3a3a3',
                    400: '#737373',
                    500: '#525252',
                    600: '#404040',
                    700: '#2d2d2d',
                    800: '#1a1a1a',
                    900: '#0d0d0d',
                },
                // Accent colors for SAS and PySpark panels
                sas: {
                    border: '#dc2626',
                    bg: '#1a1a1a',
                    text: '#f5f5f5',
                },
                pyspark: {
                    border: '#16a34a',
                    bg: '#1a1a1a',
                    text: '#f5f5f5',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Consolas', 'monospace'],
            },
        },
    },
    plugins: [],
};
