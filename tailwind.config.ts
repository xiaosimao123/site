/* eslint-disable global-require */

// @ts-check
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./node_modules/pliny/**/*.js",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src//components/**/*.{js,ts,tsx}",
    "./src/layouts/**/*.{js,ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      screens: {
        "1.5xl": "1440px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        current: colors.violet,
        primary: colors.violet,
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.600")}`,
              },
              code: { color: theme("colors.primary.400") },
            },
            "h1,h2": {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
            },
            h3: {
              fontWeight: "600",
            },
            // code: {
            //   color: theme('colors.indigo.500'),
            // },
            pre: {
              margin: 0,
              padding: 0,
              backgroundColor: "var(--tw-prose-pre-code)",
            },
            code: {
              fontWeight: "600",
              color: theme("colors.primary.600"),
            },
          },
        },
        invert: {
          css: {
            // a: {
            //   color: theme('colors.primary.500'),
            //   '&:hover': {
            //     color: `${theme('colors.primary.400')}`,
            //   },
            //   code: { color: theme('colors.primary.400') },
            // },
            // 'h1,h2,h3,h4,h5,h6': {
            //   color: theme('colors.gray.100'),
            // },
            // pre: {
            //   margin: 0,
            //   padding: 0,
            //   backgroundColor: 'var(--tw-prose-pre-bg)',
            // },
            // code: {
            //   fontWeight: '600',
            //   color: theme('colors.primary.600'),
            // },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
export default config;
