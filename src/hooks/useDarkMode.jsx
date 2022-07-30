import { useState, useEffect } from "react";

const useDarkMode = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const oppositeTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove(oppositeTheme);
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme, oppositeTheme]);

    return [oppositeTheme, setTheme];
};

export default useDarkMode;
