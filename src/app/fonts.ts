import localFont from "next/font/local";

export const Inter = localFont({
  src: "../../public/fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "1 999",
});

export const Manrope = localFont({
  src: "../../public/fonts/ManropeVariable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "1 999",
  preload: false,
});
