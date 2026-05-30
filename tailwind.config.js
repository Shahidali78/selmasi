/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand:      '#c9a96e',
        'sand-lt': '#e8d5b0',
        'sand-dk': '#a07840',
        brown:     '#2a1a0e',
        'brown-md':'#3b2a1a',
        beige:     '#f5efe6',
        'beige-md':'#ede3d5',
        cream:     '#fdfaf6',
        muted:     '#7a6350',
        accent:    '#8b5e2e',
        green:     '#25d366',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        body:    ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
