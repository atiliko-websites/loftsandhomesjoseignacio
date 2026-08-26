/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF8F5',
          100: '#F4EFE6',
          200: '#E8DECة',
          300: '#D8C7B0',
          400: '#C4AE90',
          500: '#A98F6D',
          600: '#8C7252',
          700: '#6E573E',
          800: '#513E2B',
          900: '#36281B',
        },
        ocean: {
          50: '#F0F6F8',
          100: '#D9E9EE',
          200: '#B3D3DE',
          300: '#83B5C7',
          400: '#5292A9',
          500: '#347289',
          600: '#27586B',
          700: '#1F4453',
          800: '#1B3541',
          900: '#142730',
          950: '#0C181E',
        },
        terracotta: {
          50: '#FCF5F2',
          100: '#F8E9E2',
          200: '#F1D4C6',
          300: '#E6B6A0',
          400: '#D89174',
          500: '#C76F4B',
          600: '#B25634',
          700: '#944227',
          800: '#7A3723',
          900: '#643121',
        },
        forest: {
          50: '#F3F7F5',
          100: '#E4EDE7',
          200: '#C9DCD0',
          300: '#A3C2AE',
          400: '#77A387',
          500: '#548566',
          600: '#3F6A50',
          700: '#335440',
          800: '#2A4434',
          900: '#23382C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 25px -4px rgba(0, 0, 0, 0.06)',
        'luxury': '0 20px 40px -15px rgba(27, 59, 72, 0.08)',
        'card-hover': '0 22px 35px -10px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
