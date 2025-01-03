/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: false, // Revert to the default Tailwind CSS dark mode setting (not class-based)
	content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {}, // Removed any custom theme extensions (backgrounds, colors, radius)
	},
	plugins: [], // Removed any added plugins (e.g., tailwindcss-animate)
  };
  