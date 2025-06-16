/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#1a1a2e', // Un fundal albastru-închis profund
        'custom-card': '#162447', // O culoare puțin mai deschisă pentru carduri
        'custom-accent': '#e94560', // Un accent vibrant (roz/roșu)
        'custom-text': '#f0f0f0', // Text principal deschis
        'custom-text-secondary': '#a0a0a0', // Text secundar
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // O familie de fonturi modernă și curată
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // Adăugăm plugin-ul aici
  ],
  safelist: [
    'line-clamp-2',
    'min-h-[2.5rem]',
    'min-h-[1.75rem]',
    'min-h-[1.25rem]',
    // Poți adăuga și alte clase aici dacă observi că dispar în producție
  ],
}
