/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./*.{html,js}"],
	theme: {
		extend: {
			screens: {
				xsm: "560px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},
			backgroundColor: {
				dark: "#262626",
				grayish: "#BFBFBF",
				light: "#333333",
			},
			colors: {
				hover: "#B34700",
				grayish: "#BFBFBF",
			},
			maxHeight: {
				"80vh": "80vh",
				"carousel-max": "20vh"
			},
			minHeight:{
				"carousel-min": "60vh"
			},
			borderColor: {
				hover: "#B34700",
			},
			height: {
				image: "500px",
			},
			maxWidth: {
				maxWidth: "800px",
			},
			minWidth: {
				minWidth: "400px"
			},
			width: {
				extra: "600px",
			},
			spacing: {
				100: "-100px",
			},
		},
	},
	plugins: [],
};

