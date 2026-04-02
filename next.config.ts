import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  basePath:
    process.env.NODE_ENV === "production" ? "/Kumopack-dev-landing" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/Kumopack-dev-landing/" : "",
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.kumopack.com",
      },
    ],
  },
};

export default nextConfig;
