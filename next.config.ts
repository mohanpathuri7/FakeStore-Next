import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/**",
      },
    ],
    deviceSizes: [320, 640, 768, 1024],
    imageSizes: [16, 32, 48, 64, 96, 128],
    formats: ["image/avif", "image/webp"],
    unoptimized: false,
    domains: ['fakestoreapi.com']
  },



  /* config options here */
};

export default nextConfig;
