/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      colors: {
        background: '#FAF9F6',
        foreground: '#1C1B18',
        muted: '#79766E',
        line: '#E7E4DC',
        accent: '#A8501F',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
}
