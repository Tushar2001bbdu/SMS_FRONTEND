/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: true, // Revert to the default Tailwind CSS dark mode setting (not class-based)
	content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		animation: {
        'border': 'border-pulse 1.5s infinite',
      },
	  top: {
        '20%': '20%', 
      },
      keyframes: {
        'border-pulse': {
          '0%': { borderColor: 'red-500' },
          '50%': { borderColor: 'red-300' },
          '100%': { borderColor: 'red-500' },
        }
      }}, // Removed any custom theme extensions (backgrounds, colors, radius)
	},
	plugins: [], // Removed any added plugins (e.g., tailwindcss-animate)
  };
  