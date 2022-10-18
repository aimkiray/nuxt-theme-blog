/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [],
    theme: {
        screens: {
            'xs': '555px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            fontFamily: {
                'header': ['Georgia', 'Times New Roman', 'PMingLiu', 'STSong', 'SimSun', 'WenQuanYi Bitmap Song', 'Noto Serif CJK', 'serif', ...defaultTheme.fontFamily.sans],
                'sans': ['-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'PingFang SC', 'Hiragino Sans GB', 'Source Han Sans SC', 'Noto Sans CJK SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei', 'WenQuanYi Zen Hei', 'Helvetica Neue', 'Arial', 'sans-serif', ...defaultTheme.fontFamily.sans],
            },
            lineHeight: {
                '20': '5rem',
            },
            colors: {
                'accent-color': '#40577b',
                'link-color': '#FC8181',
                'code-color': '#FFF5F7',
            },
            letterSpacing: {
                pro: '2rem',
                plus: '4rem',
                max: '5rem',
            },
            fontSize: {
                pro: '10rem',
                plus: '12rem',
            },
            screens: {
                'xs': '555px',
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
