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
    domains: ["fakestoreapi.com"],
  },

  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow", // ✅ allow search engines
          },
        ],
      },
    ];
  },
};

export default nextConfig;
