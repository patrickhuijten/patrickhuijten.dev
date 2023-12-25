/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "a.storyblok.com"
    }],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "markdown-toc",
      "react-markdown"
    ],
  },
};

module.exports = nextConfig;
