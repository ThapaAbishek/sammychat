/** @type {import('tailwindcss').Config} */
export default {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}", // scan all source files
],
theme: {
extend: {
// You can extend colors, spacing, etc. here
colors: {
brand: "#1e40af", // example custom color
},
},
},
plugins: [require("daisyui")],
daisyui: {
themes: [
"light",
"dark",
"cupcake",
"retro",
{
},
],
darkTheme: "dark", // default dark theme
},
};
