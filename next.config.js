const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,
  
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization domains (add your CDN/image hosts here)
  images: {
    domains: ['kalcufy.com', 'images.unsplash.com'],
  },
};

module.exports = withNextIntl(nextConfig);
