import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["reqres.in"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reqres.in",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
