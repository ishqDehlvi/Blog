/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                default: ["Inter", "sans-serif"],
            },
            screens: {
                main: "900px",
            },
            fontSize: {
                normal: "clamp(1.1rem, 2vw, 1.15rem)",
            },
        },
    },
    plugins: [],
};
