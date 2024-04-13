/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "a.storyblok.com" }],
  },
};

module.exports = nextConfig;
