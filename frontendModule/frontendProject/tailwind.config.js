module.exports = {
    content: [
        "./src/**/*.{html,ts}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e0f2f1',
                    100: '#b2dfdb',
                    200: '#80cbc4',
                    300: '#4db6ac',
                    400: '#26a69a',
                    500: '#003F2B', // primary
                    600: '#00897b',
                    700: '#00796b',
                    800: '#00695c',
                    900: '#004d40',
                    A100: '#a7ffeb',
                    A200: '#64ffda',
                    A400: '#1de9b6',
                    A700: '#00bfa5',
                },
                accent: {
                    50: '#e3f2fd',
                    100: '#bbdefb',
                    200: '#90caf9',
                    300: '#64b5f6',
                    400: '#42a5f5',
                    500: '#336A8D', // accent
                    600: '#1e88e5',
                    700: '#1976d2',
                    800: '#1565c0',
                    900: '#0d47a1',
                    A100: '#82b1ff',
                    A200: '#448aff',
                    A400: '#2979ff',
                    A700: '#2962ff',
                },
            },
        },
    },
    variants: {},
    plugins: [],
}