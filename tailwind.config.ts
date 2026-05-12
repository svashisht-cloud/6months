import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        petal:  { DEFAULT: '#f9a8d4', dark: '#ec4899' },
        rose:   { DEFAULT: '#fb7185', deep: '#be123c' },
        velvet: { DEFAULT: '#7c3aed', dark: '#4c1d95' },
        blush:  { DEFAULT: '#fdf2f8' },
        gold:   { DEFAULT: '#c9a96e' },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        flip: {
          '0%':   { transform: 'rotateX(0deg)' },
          '50%':  { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%,60%': { transform: 'translateX(-6px)' },
          '40%,80%': { transform: 'translateX(6px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        heartbeat: {
          '0%,100%': { transform: 'scale(1)' },
          '50%':     { transform: 'scale(1.2)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(60px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-60px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        flip:       'flip 0.6s ease-in-out',
        shake:      'shake 0.4s ease-in-out',
        fadeIn:     'fadeIn 0.8s ease-out forwards',
        heartbeat:  'heartbeat 1.4s ease-in-out infinite',
        slideLeft:  'slideLeft 0.4s ease-out',
        slideRight: 'slideRight 0.4s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
