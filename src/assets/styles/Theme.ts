const Theme = {
    addOn: {
        fullSize: {
            width: "100%",
            height: "100%",
        },
        centerContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },
        boxShadow: {
            light: {
                boxShadow:
                    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            },
            mediumLight: {
                boxShadow:
                    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
            },
            medium: {
                boxShadow:
                    "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
            },
            mediumStrong: {
                boxShadow:
                    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            },
            strong: {
                boxShadow:
                    "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
            },
        },
    },
    color: {
        primary: "#eb1c34",
        primaryContrast: "#ffffff",
        primaryShade: "#cf192e",
        primaryTint: "#ed3348",

        secondary: "#ffffff",
        secondaryContrast: "#000000",
        secondaryShade: "#e0e0e0",
        secondaryTint: "#ffffff",

        tertiary: "#1c1c1c",
        tertiaryContrast: "#ffffff",
        tertiaryShade: "#191919",
        tertiaryTint: "#333333",

        success: "#2dd36f",
        successContrast: "#ffffff",
        successShade: "#28ba62",
        successTint: "#42d77d",

        warning: "#ffc409",
        warningContrast: "#000000",
        warningShade: "#e0ac08",
        warningTint: "#ffca22",

        danger: "#ff7300",
        dangerContrast: "#000000",
        dangerShade: "#e06500",
        dangerTint: "#ff811a",

        dark: "#222428",
        darkContrast: "#ffffff",
        darkShade: "#1e2023",
        darkTint: "#383a3e",

        medium: "#92949c",
        mediumContrast: "#ffffff",
        mediumShade: "#808289",
        mediumTint: "#9d9fa6",

        light: "#f4f5f8",
        lightContrast: "#000000",
        lightShade: "#d7d8da",
        lightTint: "#f5f6f9",
    },
};

export default Theme;
