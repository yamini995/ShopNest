/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: '#FFFFFF',
        surface: '#F7F7F5',
        primary: '#1A1A1A',
        secondary: '#5C5C5C',
        border: '#E5E5E2',
        brand: {
          DEFAULT: '#0F766E',
          hover: '#115E59',
        },
        sale: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
        },
        error: '#DC2626',
        success: '#16A34A',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['11px', '14px'],
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        xl: ['20px', '28px'],
        '2xl': ['28px', '36px'],
        '3xl': ['40px', '48px'],
      },
      borderRadius: {
        btn: '6px',
        input: '6px',
        card: '8px',
        sm: '6px',
        md: '6px',
        lg: '8px',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        12: '48px',
        16: '64px',
      },
      maxWidth: {
        container: '1240px',
      },
      transitionDuration: {
        hover: '150ms',
        modal: '200ms',
      },
    },
  },
  plugins: [],
};
