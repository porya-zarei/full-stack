/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: ({colors}) => ({
            "primary-dark": "#023047",
            "primary-light": "#8ecae6",
            primary: "#219ebc",
            "secondary-dark": "#fb8500",
            "secondary-light": "#fee440",
            secondary: "#ffb703",
            dark: "#252422",
            light: "#f4f3ee",
            "gray-light": "#adb5bd",
            "gray-dark": "#343a40",
            danger: "#d62828",
            warning: "#ffba08",
            info: "#2a9d8f",
            ...colors,
        }),
    },
    plugins: [],
};
