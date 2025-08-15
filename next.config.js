/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/:lang(en|de|it)', destination: '/', permanent: true },
      { source: '/:lang(en|de|it)/:path*', destination: '/:path*', permanent: true },
    ];
  },
  images: { remotePatterns: [] },
};

module.exports = nextConfig;
