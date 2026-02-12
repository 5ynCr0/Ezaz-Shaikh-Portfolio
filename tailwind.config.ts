import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Persona 5 Color Palette
                crimson: {
                    DEFAULT: "#E73A3A",
                    dark: "#C42B2B",
                    light: "#FF5252",
                },
                ink: {
                    DEFAULT: "#0D0D0D",
                    light: "#1A1A1A",
                    lighter: "#2D2D2D",
                },
                cream: {
                    DEFAULT: "#FAF7F0",
                    dark: "#E8E4D9",
                    light: "#FFFEF9",
                },
                electric: "#00D4FF",
                warning: "#FFD93D",
            },
            fontFamily: {
                display: ["var(--font-bebas)", "Impact", "sans-serif"],
                body: ["var(--font-inter)", "system-ui", "sans-serif"],
                oswald: ["var(--font-oswald)", "Impact", "sans-serif"],
            },
            animation: {
                "slide-in-right": "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-in-left": "slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-in-up": "slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                "snap-in": "snapIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "fade-in": "fadeIn 0.3s ease-out",
                diagonal: "diagonalSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            },
            keyframes: {
                slideInRight: {
                    "0%": { transform: "translateX(100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                slideInLeft: {
                    "0%": { transform: "translateX(-100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                slideInUp: {
                    "0%": { transform: "translateY(50px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                snapIn: {
                    "0%": { transform: "scale(0.8)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                diagonalSlide: {
                    "0%": { transform: "translate(100%, -50%) skewX(-12deg)", opacity: "0" },
                    "100%": { transform: "translate(0, 0) skewX(-12deg)", opacity: "1" },
                },
            },
            backgroundImage: {
                "diagonal-lines": `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 2px,
          rgba(231, 58, 58, 0.1) 2px,
          rgba(231, 58, 58, 0.1) 4px
        )`,
            },
            boxShadow: {
                brutal: "6px 6px 0px 0px #0D0D0D",
                "brutal-sm": "4px 4px 0px 0px #0D0D0D",
                "brutal-red": "6px 6px 0px 0px #E73A3A",
            },
        },
    },
    plugins: [],
};

export default config;
