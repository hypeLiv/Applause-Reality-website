import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Moved URLs keep their old links and rankings.
  async redirects() {
    return [
      { source: "/locations", destination: "/projects", permanent: true },
      // Blog posts moved from Wix's generic /post/ prefix to /blog/.
      { source: "/post/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
