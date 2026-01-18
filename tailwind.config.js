import typography from '@tailwindcss/typography'

const config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#6366f1', // Indigo-500
      },
    },
  },
  plugins: [typography],
}

export default config
