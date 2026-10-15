import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Locations and Projects merged into one page; keep old links and rankings.
  async redirects() {
    return [{ source: "/locations", destination: "/projects", permanent: true }];
  },
};

export default nextConfig;
