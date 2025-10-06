import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,jsx,js}',
    './components/**/*.{ts,tsx,jsx,js}',
    './content/**/*.{ts,tsx,jsx,js}',
  ],
  theme: {
    extend: {
      colors: {
        azure: {
          DEFAULT: '#007FFF',
          dark: '#005EA1',
          light: '#4da6ff',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;