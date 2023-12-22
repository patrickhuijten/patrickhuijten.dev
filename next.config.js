/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ["a.storyblok.com"],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "markdown-toc",
    ],
  },
};

module.exports = nextConfig;
