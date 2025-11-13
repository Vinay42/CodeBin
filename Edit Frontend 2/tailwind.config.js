/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        "background-alt": "hsl(var(--background-alt))",
        foreground: "hsl(var(--foreground))",
        "foreground-light": "hsl(var(--foreground-light))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        "navbar-background": "hsl(var(--navbar-background))",
        "navbar-border": "hsl(var(--navbar-border))",
      },
      boxShadow: {
        glow: "0 0 20px hsla(var(--primary), 0.5)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-accent)) 100%)",
      },
    },
  },
  plugins: [],
};
