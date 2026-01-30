import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Football-themed color palette
                field: {
                    green: "#1a5f3a",
                    "green-light": "#2d7a50",
                    "green-dark": "#0f3d24",
                },
                gold: {
                    DEFAULT: "#d4af37",
                    light: "#e8c866",
                    dark: "#b8941f",
                },
                stadium: {
                    concrete: "#7c8a92",
                    night: "#0a1929",
                },
                grade: {
                    a: "#22c55e", // green-500
                    b: "#3b82f6", // blue-500
                    c: "#94a3b8", // slate-400
                    d: "#f97316", // orange-500
                    f: "#ef4444", // red-500
                },
            },
            fontFamily: {
                headline: ["Bebas Neue", "sans-serif"],
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "field-texture": "linear-gradient(180deg, #1a5f3a 0%, #0f3d24 100%)",
                "stadium-gradient": "linear-gradient(135deg, #0a1929 0%, #1a5f3a 100%)",
                "gold-gradient": "linear-gradient(135deg, #d4af37 0%, #b8941f 100%)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.5s ease-out",
                "scale-in": "scaleIn 0.3s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
