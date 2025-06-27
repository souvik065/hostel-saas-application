/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');

let nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: 'build',
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        statusCode: 301,
      },
    ];
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  // skipWaiting: true,
  skipWaiting: false,
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
});
const shouldAnalyzeBundles = process.env.ANALYZE === true;
module.exports = withPWA({
  // reactStrictMode: true,
});
if (shouldAnalyzeBundles) {
  const withNextBundleAnalyzer =
    require('next-bundle-analyzer')(/* options come there */);
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
