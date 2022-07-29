/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
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
                },
            },
        },
    },
    plugins: [],
};
