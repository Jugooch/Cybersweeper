/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: '/demos/cybersweeper',
  assetPrefix: '/demos/cybersweeper',
  trailingSlash: true,
  images: { unoptimized: true, loader: 'akamai', path: '/demos/cybersweeper' },
};

module.exports = nextConfig;
