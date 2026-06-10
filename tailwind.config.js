import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Rutas absolutas (en formato POSIX) para que Tailwind encuentre las
// clases sin importar desde qué carpeta se ejecute Vite (local, panel
// de vista previa, CI o Lovable.dev).
const root = dirname(fileURLToPath(import.meta.url));
const abs = (p) => join(root, p).replace(/\\/g, '/');

/** @type {import('tailwindcss').Config} */
export default {
  content: [abs('index.html'), abs('src/**/*.{js,jsx}')],
  theme: {
    extend: {
      colors: {
        // Kit de marca EDUCON — Universidad del Rosario
        ur: {
          navy: '#002c4d',
          'navy-dark': '#001d33',
          'navy-light': '#0a3d63',
          red: '#d33847',
          'red-dark': '#da0921',
          'red-light': '#f5e8ea',
          cream: '#f8fafc',
          'gray-1': '#f4f6f8',
          'gray-2': '#e2e8ed',
          'gray-3': '#8fa3b1',
          'gray-4': '#4a5f6e',
          text: '#0d1b26',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'ur-sm': '0 2px 8px rgba(0, 44, 77, .08)',
        'ur-md': '0 8px 32px rgba(0, 44, 77, .13)',
        'ur-lg': '0 20px 60px rgba(0, 44, 77, .18)',
      },
      borderRadius: {
        'ur-sm': '6px',
        'ur-md': '12px',
        'ur-lg': '20px',
      },
    },
  },
  plugins: [],
};
