import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    // Our CSS file is tiny (Chakra puts most styles in the page), so inline
    // it in the HTML instead of making the browser wait for a separate file.
    inlineCss: true,
    // Tree-shake barrel imports so only the components/icons we use ship.
    optimizePackageImports: ["@chakra-ui/react", "react-icons"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Default sizes + 448, so phone-sized images aren't served at 640px.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 448],
  },
  poweredByHeader: false,
};

export default nextConfig;
