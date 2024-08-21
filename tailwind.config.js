/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      height: {
        '128': '600px',
      },
      width: {
        '100': '480px'
      },
      borderRadius: {
        '4xl': '400px'
      },
      animation: {
        motion: 'motion 7s ease-in 500ms infinite',
        motionslow: 'motion 4s ease-in 3s infinite',
        'move-r-l': 'move-r-l 10s ease-out infinite'
      },
      keyframes: {
        motion: {
          '0%': { transform: "translateY(0)" },
          '100%': { transform: 'translateY(100vh)' },
        },
        'move-r-l': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        motionslow: {
          '0%': { transform: "translateY(0)" },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    }
  },
  plugins: [],
}

