/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    // Prevent Tailwind's CSS reset from overriding Docusaurus/Infima base styles
    preflight: false,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
    "./i18n/**/*.{md,mdx,json}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        zinc: {
          950: '#09090b',
        }
      }
    },
  },
  plugins: [],
}
