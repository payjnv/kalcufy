const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,
  
  // Disable router cache so locale changes work on client navigation
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization domains (add your CDN/image hosts here)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'kalcufy.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
};
module.exports = withNextIntl(nextConfig);
