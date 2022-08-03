/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#202225",
                secondary: "#5865f2",

                gray: {
                    900: "#202225",
                    800: "#2F3136",
                    700: "#36393F",
                    600: "#4F545C",
                    500: "#595e66",
                    400: "#d4d7dc",
                    300: "#e3e5e8",
                    200: "#ebedef",
                    100: "#f2f3f5",
                },
            },
        },
    },
    plugins: [],
};
