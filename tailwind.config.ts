import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
      },
      colors: {
        primary: '#0A0A0A',
        secondary: '#FFFFFF',
        accent: '#B8860B',
      },
    },
  },
  plugins: [],
};
export default config;