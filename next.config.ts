import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },
  reactStrictMode: false,
};

export default nextConfig;
