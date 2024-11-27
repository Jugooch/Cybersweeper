/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/demos/cybersweeper',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
