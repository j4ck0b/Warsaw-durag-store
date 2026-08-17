import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'warsawduragstore.pl',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
