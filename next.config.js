/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      { hostname: '**.giphy.com' },
      { hostname: 'giphy.com' },
    ],
  },
}

module.exports = nextConfig
