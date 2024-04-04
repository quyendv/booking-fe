/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/locales/i18n.ts');

const nextConfig = withNextIntl({
  distDir: '.next', // default
  images: {
    // domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 'cf.bstatic.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
});

module.exports = nextConfig;
