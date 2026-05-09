import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "landbuyself-mediafiles.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "storage.example.com",
      },
    ],
  },
};

export default nextConfig;