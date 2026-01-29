import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-7317646fe751438aab922bda666d9eaf.r2.dev',
      },
    ],
  },
};

export default nextConfig;
