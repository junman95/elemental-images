import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  turbopack: {},
  async redirects() {
    return [
      // /storybook → /storybook/index.html (정적 파일 서빙)
      {
        source: "/storybook",
        destination: "/storybook/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
