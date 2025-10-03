import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', "./src/**/*.{html,ts,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'fold': '300px',
    },
    extend: {
      colors: {
        "demo-primary": "#0F172A",
        "demo-secondary": "#A855F7"
      }
    }
  },
  // Enable Tailwind Typography for better default markdown styling via the `prose` classes
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
} satisfies Config

