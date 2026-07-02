import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita colisiones con .next creado por otro usuario en el VPS (deploy sin sudo).
  distDir: process.env.NODE_ENV === "production" ? "dist" : ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui.aceternity.com",
      },
    ],
  },
};

export default nextConfig;
