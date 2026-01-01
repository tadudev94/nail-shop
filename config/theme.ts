export const themes = {
    nail: {
        colors: {
            primary: "340 82% 85%", // Soft Pink
            secondary: "340 30% 96%", // Very Light Pink
            accent: "340 40% 60%", // Darker Pink/Mauve
            background: "0 0% 100%",
            foreground: "340 20% 20%",
        },
        fonts: {
            heading: "var(--font-playfair)",
            body: "var(--font-inter)",
        },
        radius: "0.75rem",
    },
    spa: {
        colors: {
            primary: "140 30% 80%", // Sage Green
            secondary: "140 20% 96%", // Light Sage
            accent: "140 40% 50%", // Deep Green
            background: "40 20% 98%", // Cream
            foreground: "140 20% 20%",
        },
        fonts: {
            heading: "var(--font-cormorant)",
            body: "var(--font-lato)",
        },
        radius: "1rem",
    },
    barber: {
        colors: {
            primary: "45 90% 50%", // Gold
            secondary: "0 0% 10%", // Dark Grey
            accent: "0 0% 100%", // White
            background: "0 0% 5%", // Almost Black
            foreground: "0 0% 95%",
        },
        fonts: {
            heading: "var(--font-oswald)",
            body: "var(--font-roboto-condensed)",
        },
        radius: "0",
    },
    tattoo: {
        colors: {
            primary: "0 0% 10%", // Dark
            secondary: "0 0% 90%", // Light
            accent: "10 80% 50%", // Red
            background: "0 0% 0%", // Black
            foreground: "0 0% 100%", // White
        },
        fonts: {
            heading: "var(--font-cinzel)",
            body: "var(--font-open-sans)",
        },
        radius: "0",
    },
    food: {
        colors: {
            primary: "25 90% 60%", // Orange
            secondary: "35 80% 95%", // Light Yellow/Cream
            accent: "10 80% 50%", // Red
            background: "0 0% 100%",
            foreground: "20 10% 20%",
        },
        fonts: {
            heading: "var(--font-fredoka)",
            body: "var(--font-quicksand)",
        },
        radius: "1rem",
    }
}

export type ThemeName = keyof typeof themes
