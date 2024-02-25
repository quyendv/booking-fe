/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/locales/i18n.ts');

const nextConfig = withNextIntl({
  distDir: '.next', // default
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
});

module.exports = nextConfig;
