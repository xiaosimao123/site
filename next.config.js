/** @type {import('next').NextConfig} */
const path = require("path");
const { withContentlayer } = require("next-contentlayer");

const nextConfig = withContentlayer({
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  eslint: {
    dirs: ["app", "components", "layouts", "scripts"],
  },
  images: {
    domains: ["picsum.photos", "pbs.twimg.com"],
  },
  // experimental: {
  //   appDir: true,
  // },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
});

module.exports = nextConfig;
