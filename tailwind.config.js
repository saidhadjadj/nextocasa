/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      // ─── Polices NextoCasa ─────────────────────────────────────────────────
      fontFamily: {
        // Titres et citations — Cormorant Garamond
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        // Corps de texte — DM Sans
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },

      // ─── Espacement typographique ──────────────────────────────────────────
      letterSpacing: {
        widest: "0.18em",
      },

      // ─── Transitions supplémentaires ──────────────────────────────────────
      transitionDuration: {
        650: "650ms",
      },
    },
  },
  plugins: [],
};
