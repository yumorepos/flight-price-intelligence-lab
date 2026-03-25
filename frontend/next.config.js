/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_USE_BACKEND_PROXY: process.env.USE_BACKEND_PROXY,
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL;
    const useBackendProxy = process.env.USE_BACKEND_PROXY === "true";

    if (!useBackendProxy || !backendUrl) {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
