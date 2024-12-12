import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  }
};

export default nextConfig;
