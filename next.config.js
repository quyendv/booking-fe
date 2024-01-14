/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/locales/i18n.ts');

const nextConfig = withNextIntl({
  distDir: '.next', // default
});

module.exports = nextConfig;
