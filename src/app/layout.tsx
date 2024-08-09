/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-danger */
import type { Metadata } from "next";

import "@/styles/globals.css";

import React, { useEffect, useState } from "react";
import SectionContainer from "@/components/SectionContainer";
import Header from "@/components/Header";
import { MainNavigation } from "@/components/common/MainNavigation";
// const inter = Inter({ subsets: ["latin"] });
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import {
  codeSnippets,
  CodeSnippets,
} from "@/components/landing-page/HowItWorks";
import { mapObjectValues, promiseAllProperties } from "@/lib/utils/object";
import {
  ColorScheme,
  snippetToHtml,
} from "@/components/mdx/ui/syntax-highlighting";
import { ColorSchemeProvider } from "../components/ColorSchemeContext";
import { Footer } from "@/components/common/Footer";
import { cx } from "class-variance-authority";
import { Inter } from "./fonts";
import NoSSR from "./NoSSR";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cx(
        Inter.variable,
        GeistSans.variable,
        GeistMono.variable,
        "scroll-padding"
      )}
      lang="en"
    >
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: /* js */ `
                const savedTheme = localStorage.getItem('theme') ?? 'system'

                if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
          `,
          }}
        />
      </head>
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        {/* <script src="https://giscus.app/client.js"
        data-repo="[在此输入仓库]"
        data-repo-id="[在此输入仓库 ID]"
        data-category="[在此输入分类名]"
        data-category-id="[在此输入分类 ID]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossOrigin="anonymous"
        async>
        </script> */}
        <NoSSR>
          <ColorSchemeProvider>
            <MainNavigation />
            {/* <SectionContainer>
          <div className="flex h-screen flex-col justify-between font-sans">

            <main className="mb-auto">{children}</main>
          </div>
        </SectionContainer> */}
            <div className="flex min-h-screen flex-col justify-between">
              <main
                className="relative pt-16"
                style={{ scrollPaddingTop: "150px" }}
              >
                {/* <SectionContainer> */}
                {children}
                {/* </SectionContainer> */}
              </main>
              <Footer />
            </div>
          </ColorSchemeProvider>
        </NoSSR>
      </body>
    </html>
  );
}

// export type PreprocessedCodeSnippets = Record<ColorScheme, CodeSnippets>

// export const htmlForCodeSnippets = (
//   colorScheme: ColorScheme
// ): Promise<CodeSnippets> =>
//   promiseAllProperties(
//     mapObjectValues(
//       codeSnippets,
//       (_key, snippets) =>
//         Promise.all(
//           snippets.map(({ content, file, lines }) =>
//             snippetToHtml(content, colorScheme).then((_) => ({
//               file,
//               lines,
//               content: _,
//             }))
//           )
//         ) as any // TODO: fix type
//     )
//   )
