/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const plugin = require("tailwindcss/plugin");

// @ts-check
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  // content: [
  //   "./node_modules/pliny/**/*.js",
  //   "./src/app/**/*.{js,ts,jsx,tsx}",
  //   "./src//components/**/*.{js,ts,jsx,tsx}",
  //   "./src/layouts/**/*.{js,ts,jsx,tsx}",
  //   "./content/**/*.{md,mdx}",
  // ],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./content/**/*.{md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        slideUpAndFade: {
          "0%": { opacity: "0", transform: "translateY(2px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          "0%": { opacity: "0", transform: "translateX(-2px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideDownAndFade: {
          "0%": { opacity: "0", transform: "translateY(-2px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          "0%": { opacity: "0", transform: "translateX(2px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        slideUpAndFade: "slideUpAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideDownAndFade:
          "slideDownAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideRightAndFade:
          "slideRightAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
      },
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
        inter: ["Inter", "sans-serif"],
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        current: colors.violet,
        primary: colors.violet,
        gray: colors.gray,
      },

      dropShadow: {
        doodle: [
          "-0.1875rem -0.1875rem 0.125rem var(--tw-shadow-color)",
          "0.1875rem 0.1875rem 0.125rem var(--tw-shadow-color)",
          "0.1875rem -0.1875rem 0.125rem var(--tw-shadow-color)",
          "-0.1875rem 0.1875rem 0.125rem var(--tw-shadow-color)",
        ],
      },
      boxShadow: {
        "toolbar-hover": "0 0 8px 2px var(--tw-shadow-color)",
        "toolbar-elevated": "0 0 6px 1px var(--tw-shadow-color)",
      },
      textShadow: {
        none: "none",
        DEFAULT: "0 0.0625rem 0.125rem var(--tw-shadow-color)",
      },
      ringWidth: {
        0: "0rem",
        1: "0.0625rem",
        2: "0.125rem",
        DEFAULT: "0.1875rem",
      },
      textDecorationThickness: {
        0: "0rem",
        1: "0.0625rem",
        2: "0.125rem",
        DEFAULT: "0.1875rem",
      },
      textUnderlineOffset: {
        0: "0rem",
        1: "0.0625rem",
        2: "0.125rem",
        DEFAULT: "0.1875rem",
      },
      transitionDuration: {
        "50": "50ms",
        "250": "250ms",
      },
      transitionDelay: {
        "50": "50ms",
        "250": "250ms",
      },
      transitionTimingFunction: {
        in: "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
        DEFAULT: "ease-in-out",
      },

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            pre: {
              // fontFamily: {
              //   // sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
              //   mono: ['var(--font-geist-mono)'],
              // },
              // fontWeight: 600,
              // fontFamily:var(--font-geist-sans),
              // marginTop: 0,
              // marginBottom: 0,
            },
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.600")}`,
              },
              code: { color: theme("colors.primary.400") },
            },
            // "h1,h2": {
            //   fontWeight: "700",
            //   letterSpacing: theme("letterSpacing.tight"),
            // },
            // h3: {
            //   fontWeight: "600",
            // },
            code: {
              fontWeight: "600",
              color: theme("colors.primary.600"),
              borderColor: theme("colors.primary.300"),
              backgroundColor: theme("colors.primary.100"),
            },
          },
        },
        invert: {
          css: {},
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({});
    }),
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
export default config;
