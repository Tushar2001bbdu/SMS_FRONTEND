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
		backgroundImage:{
			'cover': ['url("https://media.gettyimages.com/id/1148057061/vector/entrepreneurship-in-science-outline-style-infographic-design.jpg?s=612x612&w=gi&k=20&c=S5ebo0UsBsZgLeH0YgO8ptMHOu4MYyHMnUsguiBXmEY=")', 'no-repeat',  'cover'],
		},
		animation: {
        'border': 'border-pulse 1.5s infinite',
      },
	  top: {
        '20%': '20%', 
      },
      keyframes: {
		"fade-in-out": {
        "0%": { opacity: "0" },
        "10%": { opacity: "1" },
        "90%": { opacity: "1" },
        "100%": { opacity: "0" },
      },
        'border-pulse': {
          '0%': { borderColor: 'red-500' },
          '50%': { borderColor: 'red-300' },
          '100%': { borderColor: 'red-500' },
        }
      },
	animation:{
		 "fade-in-out": "fade-in-out 15s ease-in-out",
	}}, 
	},
	plugins: [require('daisyui')], 
  };
  