import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disable ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily disable TypeScript errors during build
  },
};

export default nextConfig;
