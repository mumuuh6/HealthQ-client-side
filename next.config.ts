import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  images: {
    domains: [
      "medeasy.health",
      "api.medeasy.health"
    ],
  },
};

export default nextConfig;
