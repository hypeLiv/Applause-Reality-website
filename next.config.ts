import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// This machine's Wi-Fi/LAN addresses, so a phone on the same network can open
// the dev server (e.g. http://192.168.1.5:3000) without Next blocking its dev assets.
const lanHosts = Object.values(networkInterfaces())
  .flat()
  .filter((i) => i && i.family === "IPv4" && !i.internal)
  .map((i) => i!.address);

const nextConfig: NextConfig = {
  // Dev server only; production builds ignore it.
  allowedDevOrigins: lanHosts,
  // Photos uploaded to Sanity are served from its CDN.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
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
